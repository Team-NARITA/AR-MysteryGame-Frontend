import { useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

import { useLocalStorage } from "../common/useLocalStorage";
import Chapter from "./ChapterData";

import { MuiChat } from "./MuiChat";
import { ChatController } from "chat-ui-react";
import { serialize, deserialize } from "react-serialize";

import Header from "../common/Header";
import HomeButton from "../common/HomeButton";
import AppArea from "../common/AppArea";

import "./TalkPage.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: [
            "GenEiLateMinP_v2"
        ]
    }
})

const TalkPage = () => {
    return (
        <>
            <Header prev={true} />
            <AppArea>
                <ChatArea />
            </AppArea>
            <HomeButton />
        </>
    )
}

const ChatArea = () => {
    const { chapterId } = useParams();
    const [ chapterData, setChapterData ] = useState(null);
    const [ chatCtl ] = useState(new ChatController({delay:1000}));
    const [ chatLogs, setChatLogs ] = useLocalStorage(chapterId+".logs", []);
    const [ progress, setProgress ] = useLocalStorage(chapterId+".progress", 0);

    useEffect(() => {
        gameServer.get("/v1/chapter/file/" + chapterId, [], (chapterData) => {
            let chapter = new Chapter(chapterId ,chapterData.data);
            chapter.setProgress(progress);
            setChapterData(chapter);
        });

        //チャットログのSerialize <=> Deserialize
        //typeがjsxの場合上手く変換できないため react-serializeを使った処理
        chatCtl.setMessages(chatLogs.map((it) => {
            if (it.type == "jsx") it.content = deserialize(it.content);
            it.createdAt = new Date(it.createdAt);
            return it;
        }));
        chatCtl.addOnMessagesChanged(() => {
            let logs = chatCtl.getMessages();
            let serializedLogs = [];
            logs.map((it) => {
                let item = it;
                if (it.type == "jsx") {
                    item = JSON.parse(JSON.stringify(it));
                    item.content = serialize(it.content);
                }
                serializedLogs.push(item);
            });
            setChatLogs(serializedLogs);
        });
    }, []);

    useEffect(() => {
        if (!chapterData) return;
        play();
    }, [chapterData, progress]);

    const reciveMessage = (item) => {
        chatCtl.addMessage({
            type: "text",
            content: item.content,
            self: false,
            username: item.sender
        }).then(() => {
            setProgress(chapterData.progress);
        });
    }

    const reciveImage = (item) => {
        chatCtl.addMessage({
            type: "jsx",
            content: (
                <div>
                    <img src={item.content} width="100%"/>
                </div>
            ),
            self: false,
            username: item.sender
        }).then(() => {
            setProgress(chapterData.progress);
        });
    }

    const showSelectButton = (item) => {
        let options = [];
        item.content.forEach((it) => {
            options = [...options, {
                value: it,
                text: it
            }];
        });
        chatCtl.setActionRequest({
            type: 'select',
            options: options
        }).then(() => {
            setProgress(chapterData.progress);
        });
    }

    const showInput = (item) => {
        chatCtl.setActionRequest({type: "text", always: true},
            (answer) => {
                if (answer.value === "ヒント") {
                    chatCtl.addMessage({
                        type: "text",
                        content: item.hint,
                        self: false,
                        username: "ヒント"
                    });
                    return;
                }
                gameServer.post("/v1/mystery/submit/" + item.mysteryId, {"answer": answer.value}, 
                    (response) => {
                    if (response.data.isCorrect) {
                        chatCtl.cancelActionRequest();
                        setProgress(chapterData.progress);
                    } else {
                        chatCtl.addMessage({
                            type: "text",
                            content: "「ヒント」と入力するとヒントを見る事ができます",
                            self: false,
                            username: ""
                        })
                    }
                });
            }
        );
        chatCtl.callOnMessagesChanged();
    }

    const play = () => {
        if (!chapterData) return;
        if (!chapterData.hasNext()) {
            let isClear = localStorage.getItem(chapterId+".clear");
            if (!isClear) {
                gameServer.post("/v1/chapter/clear/" + chapterId, []);
                localStorage.setItem(chapterId+".clear", true);
            }
            return;
        }
        let next = chapterData.next();
        switch (next.type) {
            case "text":
                reciveMessage(next);
                break;
            case "image":
                reciveImage(next);
                break;
            case "button":
                showSelectButton(next);
                break;
            case "input":
                showInput(next);
                break;
        }
    }

    return (
        <div style={{left:"5px", right:"5px", top:"5px", bottom:"5px", position:"absolute"}}>
            <ThemeProvider theme={theme}>
                <MuiChat chatController={chatCtl} />
            </ThemeProvider>
        </div>
    );
}

export default TalkPage;
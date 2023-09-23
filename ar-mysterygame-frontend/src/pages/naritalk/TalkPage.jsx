import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

import { useLocalStorage } from "../common/useLocalStorage";
import Chapter from "./ChapterData";

import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator, MessageInput, Avatar, Button } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { ChatController, MuiChat } from "chat-ui-react";
import { serialize, deserialize } from "react-serialize";

import Header from "../common/Header";
import HomeButton from "../common/HomeButton";
import AppArea from "../common/AppArea";

import "./TalkPage.css";

const TalkPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header prev={navigate} />
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
    const [chatCtl] = useState(new ChatController());
    //const [ typingIndicator, setTypingIndicator ] = useState(null);
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
                let item = JSON.parse(JSON.stringify(it));
                if (it.type == "jsx") item.content = serialize(it.content);
                serializedLogs.push(item);
            });
            setChatLogs(serializedLogs);
        });
        chatCtl.setActionRequest({type:"text", always: true});
    }, []);

    useEffect(() => {
        if (!chapterData) return;
        play();
    }, [chapterData, progress]);

    const reciveMessage = (item) => {
        setTimeout(() => {
            chatCtl.addMessage({
                type: "text",
                content: item.content,
                self: false,
                username: item.sender
            }).then(() => {
                setProgress(chapterData.progress);
            });
        }, 1000);
    }

    const reciveImage = (item) => {
        setTimeout(() => {
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
        }, 1000);
    }

    const play = () => {
        if (!chapterData) return;
        if (!chapterData.hasNext()) return;
        let next = chapterData.next();
        switch (next.type) {
            case "text":
                reciveMessage(next);
                break;
            case "image":
                reciveImage(next);
                break;
        }
    }

    return (
        <div style={{left:"5px", right:"5px", top:"5px", bottom:"5px", position:"absolute"}}>
            <MuiChat chatController={chatCtl} />
        </div>
    );
}

export default TalkPage;
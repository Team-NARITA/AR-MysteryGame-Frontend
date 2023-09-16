import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

import { usePersistState } from "../common/usePersistState";
import Chapter from "./ChapterData";

import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator, MessageInput, Avatar } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Header from "../common/Header";
import HomeButton from "../common/HomeButton";
import AppArea from "../common/AppArea";

const TalkPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header prev={navigate} />
            <AppArea>
                <MainContainer responsive>
                    <ChatArea />
                </MainContainer>
            </AppArea>
            <HomeButton />
        </>
    )
}

const ChatArea = () => {
    const { chapterId } = useParams();
    const [ chapterData, setChapterData ] = useState(null);
    const [ typingIndicator, setTypingIndicator ] = useState(null);
    const [ chatLogs, setChatLogs ] = usePersistState({key: chapterId+".logs", initialValue: []});

    const reciveMessage = (message) => {
        setTypingIndicator(<TypingIndicator content={message.sender + "が入力中"}/>)
        setTimeout(() => {
            new Promise((resolve) => {
                let logs = chatLogs ?? [];
                setChatLogs([...logs, message]);
                setTypingIndicator(null);
                resolve();
            }).then(() => {
                localStorage.setItem(chapterId+".progress", chapterData.progress);
            })
        }, 1000);
    }

    const play = () => {
        if (chapterData == null) return;
        let next = chapterData.next();
        if (next.type == "text" || next.type == "image") {
            setTimeout(() => {
                reciveMessage(toLogMessage(next));
            }, 1000);
        }
    }

    useEffect(() => {
        gameServer.get("/v1/chapter/file/" + chapterId, [], (chapterData) => {
            let chapter = new Chapter(chapterId ,chapterData.data);
            let progress = localStorage.getItem(chapterId+".progress") ?? 0;
            chapter.setProgress(progress);
            setChapterData(chapter);
        });
    }, []);

    useEffect(() => {
        play();
    }, [chapterData, chatLogs]);

    let logs = chatLogs ?? [];

    return (
        <ChatContainer>
            <MessageList typingIndicator={typingIndicator}>
                {
                    logs.map((item, i) => toChatMessage(i, item))
                }
            </MessageList>
            <MessageInput attachButton={false} />
        </ChatContainer>
    )
}

const toLogMessage = (item) => {
    switch (item.type) {
        case "text":
            return {
                type: "text",
                message: item.content,
                sender: item.sender ?? "NoName",
                direction: item.isUser ? "outgoing" : "incoming"
            }
        case "image":
            return {
                type: "image",
                image: item.content,
                imageAlt: item.imageAlt,
                sender: item.sender ?? "NoName",
                direction: item.isUser ? "outgoing" : "incoming"
            }
    }
}

const toChatMessage = (key, chatItem) => {
    switch (chatItem.type) {
        case "text": 
            return (
                <Message key={key} model={{
                    message: chatItem.message,
                    sender: chatItem.sender,
                    direction: chatItem.direction,
                    position: "first"
                }}>
                    <Message.Header sender={chatItem.sender} />
                </Message>
            )
        case "image":
            return (
                <Message key={key} model={{
                    sender: chatItem.sender,
                    direction: chatItem.direction,
                    position: "first"
                }}>
                    <Message.Header sender={chatItem.sender} />
                    <Message.ImageContent src={chatItem.image} alt={chatItem.imageAlt} width="70vw"/>
                </Message>
            )
    }
}

export default TalkPage;
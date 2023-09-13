import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

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
    const [ chapterData, setChapterData ] = useState();
    const [ typingIndicator, setTypingIndicator ] = useState(null);
    const [ chatLogs, setChatLogs ] = useState([]);

    useEffect(() => {
        gameServer.get("/v1/chapter/file/" + chapterId, [], (chapter) => {
            setChapterData(chapter.data);
        });
    }, []);

    return (
        <ChatContainer>
            <MessageList typingIndicator={typingIndicator}>
                {
                    chatLogs.map((item, i) => toChatMessage(i, item))
                }
            </MessageList>
            <MessageInput attachButton={false} />
        </ChatContainer>
    )
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
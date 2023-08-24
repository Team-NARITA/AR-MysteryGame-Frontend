import { useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator, MessageInput, Avatar } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Header from "../common/Header";
import HomeButton from "../common/HomeButton";
import AppArea from "../common/AppArea";

const TalkPage = () => {
    const { chapterId } = useParams();
    const [ chapterData, setChapterData ] = useState();
    const [ typingIndicator, setTypingIndicator ] = useState(null);
    const [ chatLogs, setChatLogs ] = useState([]);

    useEffect(() => {
        gameServer.get("/v1/chapter/file/" + chapterId, [], (chapter) => {
            setChapterData(chapter.data);
        });
        setChatLogs([
            {
                type: "message",
                message: "こんにちは",
                sender: "rain1208",
                direction: "incomming"
            },
            {
                type: "message",
                message: "こんにちは",
                sender: "rain1208",
                direction: "outgoing"
            },
            {
                type: "image",
                image: "https://media.discordapp.net/attachments/1095617215291719710/1143782884428234852/001.png",
                imageAlt: "image sample",
                sender: "rain1208",
                direction: "incomming"
            },
            {
                type: "message",
                message: "いい感じじゃない？",
                sender: "rain1208",
                direction: "outgoing"
            }
        ])
    }, [])

    return (
        <>
            <Header />
            <AppArea>
                <MainContainer responsive>
                    <ChatContainer>
                        <MessageList typingIndicator={typingIndicator}>
                            {
                                chatLogs.map((item, i) => (<ChatMessage key={i} chatLog={item} />))
                            }
                        </MessageList>
                        <MessageInput attachButton={false} />
                    </ChatContainer>
                </MainContainer>
            </AppArea>
            <HomeButton />
        </>
    )
}

const ChatMessage = (props) => {
    const chatLog = props.chatLog;
    
    switch (chatLog.type) {
        case "message": 
            return (
                <Message model={{
                    message: chatLog.message,
                    sender: chatLog.sender,
                    direction: chatLog.direction,
                    position: "single"
                }}>
                    <Message.Header sender={chatLog.sender} />
                </Message>
            )
        case "image":
            return (
                <Message model={{
                    sender: chatLog.sender,
                    direction: chatLog.direction
                }}>
                    <Message.Header sender={chatLog.sender} />
                    <Message.ImageContent src={chatLog.image} alt={chatLog.imageAlt} width="70vw"/>
                </Message>
            )
    }
}

export default TalkPage;
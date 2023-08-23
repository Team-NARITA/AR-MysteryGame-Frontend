import { useParams } from "react-router";
import { useState, useEffect } from "react";
import gameServer from "../../network/gameServer";

import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator, MessageInput } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Header from "../common/Header";
import HomeButton from "../common/HomeButton";
import AppArea from "../common/AppArea";

const TalkPage = () => {
    const { chapterId } = useParams();
    const [ chapterData, setChapterData ] = useState();

    useEffect(() => {
        gameServer.get("/v1/chapter/file/" + chapterId, [], (chapter) => {
            setChapterData(chapter.data);
        });
    }, [])

    return (
        <>
            <Header />
            <AppArea>
                <MainContainer responsive>
                    <ChatContainer>
                        <MessageList>
                            <Message model={{
                                message: "こんにちは",
                                sentTime: "15 mins ago",
                                sender: "rain1208",
                                direction: "incoming",
                                position: "single"
                            }} />
                            <Message model={{
                                message: "こんにちは",
                                sentTime: "15 mins ago",
                                sender: "rain1208",
                                direction: "outgoing",
                                position: "single"
                            }} />
                        </MessageList>
                        <MessageInput attachButton={false} />
                    </ChatContainer>
                </MainContainer>
            </AppArea>
            <HomeButton />
        </>
    )
}

export default TalkPage;
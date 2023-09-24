import HomeButton from "./common/HomeButton";
import Header from "./common/Header";
import AppArea from "./common/AppArea";

import ChapterList from "./naritalk/ChapterList"


const NaritalkPage = () => {

    return (
        <>
            <Header />
            <AppArea>
                <ChapterList />
            </AppArea>
            <HomeButton />
        </>
    );
}

export default NaritalkPage;
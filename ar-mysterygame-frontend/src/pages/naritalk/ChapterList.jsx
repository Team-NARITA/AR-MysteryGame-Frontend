import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import gameServer from "../../network/gameServer";

const ChapterList = () => {
    const [chapterList, setChapterList] = useState([]);
    useEffect(() => {
        gameServer.get("/v1/chapter/authorize", [], (authorizedChapter) => {
            setChapterList(authorizedChapter.data);
        });
    }, []);

    return (
        <>
        {
            chapterList.map((chapter) => (<ChapterListItem key={chapter.chapterId} chapter={chapter} />))
        }
        </>
    )
}

const ChapterListItem = (props) => {
    const chapterData = props.chapter;
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate("./"+chapterData.chapterId)}>{chapterData.chapterName}</div>
    )
}

export default ChapterList;
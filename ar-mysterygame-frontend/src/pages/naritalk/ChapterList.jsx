import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import gameServer from "../../network/gameServer";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "./ChapterList.css"

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
        <div className="chapterlist-item" onClick={() => navigate("./"+chapterData.chapterId)}>
            <h2 className="name">{chapterData.chapterName}</h2>
            <ArrowForwardIosIcon className="arrow-icon" />
        </div>
    )
}

export default ChapterList;
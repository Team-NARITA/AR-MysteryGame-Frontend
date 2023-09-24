class Chapter {
    chapterId;
    chapterData;
    progress = 0;
    
    constructor(chapterId, chapterData) {
        this.chapterId = chapterId;
        this.chapterData = chapterData;
        this.progress = 0;
    }

    setProgress(progress) {
        this.progress = progress;
    } 

    hasNext() {
        return this.chapterData.length > this.progress;
    }

    next() {
        if (!this.hasNext()) throw new Error("Index Out Of Bounds");
        let data = this.chapterData[this.progress];
        this.progress++;
        return data;
    }
}

export default Chapter;
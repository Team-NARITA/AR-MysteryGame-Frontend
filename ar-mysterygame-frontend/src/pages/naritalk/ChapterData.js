class Chapter {
    chapterId;
    chapterData;
    progress = -1;
    
    constructor(chapterId, chapterData) {
        this.chapterId = chapterId;
        this.chapterData = chapterData;
        this.progress = -1;
    }

    setProgress(progress) {
        this.progress = progress;
    } 

    hasNext() {
        return this.chapterData.length < this.progress;
    }

    next() {
        if (this.hasNext()) throw new Error("Index Out Of Bounds")
        this.progress++;
        return this.chapterData[this.progress];
    }
}

export default Chapter;
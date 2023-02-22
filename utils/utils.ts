function secondsToTime(e: number) {
    const m = Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
        s = Math.floor(e % 60)
            .toString()
            .padStart(2, "0");

    return m + ":" + s;
}

export default secondsToTime;

import { useSelector } from "react-redux";
import { State } from "../context/reducer";

export const calculateStats = () => {
    const {
        word: { currWord, wordList, typedHistory },
        preferences: { time },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / time / 5;
    const correctWords = result.filter((x) => x).length;
    const incorrectWords = result.filter((x) => !x).length;
    const totalWords = correctWords + incorrectWords;
    const accuracy =
        (correctWords / totalWords) * 100
            ? (correctWords / totalWords) * 100
            : 0;
    return { wpm, accuracy, correctWords, incorrectWords };
};

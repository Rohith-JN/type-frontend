import { useSelector } from "react-redux";
import { State } from "../context/reducer";

export const calculateStats = () => {
    const {
        word: { currWord, wordList, typedHistory, incorrectCharsHistory },
        preferences: { time },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((_, idx) => {
        const typedWord = typedHistory[idx];
        const word = wordList[idx];
        let wordCorrectChars = 0;
        for (let i = 0; i < typedWord.length; i++) {
            if (typedWord[i] === word[i]) {
                wordCorrectChars++;
            }
        }
        correctChars += wordCorrectChars;
    });
    let incorrectChars = 0;
    incorrectCharsHistory.map((object, _) => {
        incorrectChars += object.totalIncorrectCharacters;
    });
    const wpm = ((correctChars + spaces) * 60) / time / 5;
    const rawWpm = ((correctChars + incorrectChars + spaces) * 60) / time / 5;
    const accuracy =
        (correctChars / (correctChars + incorrectChars)) * 100
            ? (correctChars / (correctChars + incorrectChars)) * 100
            : 0;
    return {
        wpm,
        rawWpm,
        accuracy,
        incorrectChars,
        correctChars,
    };
};

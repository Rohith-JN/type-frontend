import { useSelector } from "react-redux";
import { State } from "../context/state";

export const useCalculateStats = () => {
    const { typedWord, wordList, typedHistory, incorrectCharsHistory } =
        useSelector((state: State) => state.word);
    const { time } = useSelector((state: State) => state.preferences);
    const spaces =
        time == 15 || time == 30 || time == 60 || time == 120
            ? 0
            : wordList.indexOf(typedWord);
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
    const wpm = Math.floor(((correctChars + spaces) * 60) / time / 5);
    const rawWpm = Math.floor(
        ((correctChars + incorrectChars + spaces) * 60) / time / 5
    );
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

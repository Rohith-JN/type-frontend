import { useSelector } from "react-redux";
import { State } from "../context/state";

export const useCalculateStats = () => {
    const {
        word: {
            currWord,
            wordList,
            typedHistory,
            incorrectCharsHistory,
            typedWord,
        },
        preferences: { time },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    const getCorrectAndIncorrectCharsCount = (word1: string, word2: string) => {
        let correctCharsCount = 0;
        let incorrectCharsCount = 0;
        let bound = Math.min(word1.length, word2.length);

        for (let i = 0; i < bound; i++) {
            if (word1[i] === word2[i]) {
                correctCharsCount++;
            } else {
                incorrectCharsCount++;
            }
        }

        return { correctCharsCount, incorrectCharsCount };
    };

    let incorrectChars = 0;
    result.forEach((_, idx) => {
        const typedWord = typedHistory[idx];
        const word = wordList[idx];
        const { correctCharsCount } = getCorrectAndIncorrectCharsCount(
            typedWord,
            word
        );
        correctChars += correctCharsCount;
    });
    if (typedWord && typedWord.length > 0) {
        const { correctCharsCount, incorrectCharsCount } =
            getCorrectAndIncorrectCharsCount(typedWord, currWord);
        correctChars += correctCharsCount;
        incorrectChars += incorrectCharsCount;
    }
    if (typedWord && typedWord.length > currWord.length) {
        incorrectChars += typedWord.slice(currWord.length).length;
    }
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


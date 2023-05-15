import { useSelector } from "react-redux";
import { State } from "../context/reducer";

export const calculateChartStats = () => {
    const {
        word: {
            typedDurationHistory,
            typedHistory,
            wordList,
            incorrectCharsHistory,
        },
    } = useSelector((state: State) => state);
    // wpm: doesn't include incorrect chars
    // rawWpm: includes correct chars
    const newTypedHistory = wordList.slice(0, typedHistory.length);
    const charactersPerWord = typedHistory.map((word) => word.length);
    const wpmData = charactersPerWord.map((value, index) =>
        Math.round(
            (value * 60) / (parseInt(typedDurationHistory[index]) / 1000) / 5
        )
    );
    // map through typedHistory then match index of word from typedHistory to the idx in incorrectCharsHistory, minus the incorrect chars of the word from typedHistory from incorrectCharsHistory

    const xAxisData = Array.from(
        { length: newTypedHistory.length },
        (_, i) => i + 1
    );
    const incorrectChars = incorrectCharsHistory
        .map((item, idx) => {
            return { x: item.idx + 1, y: item.totalIncorrectCharacters };
        });
    console.log(incorrectChars);

    return { newTypedHistory, xAxisData, wpmData, incorrectChars };
};

import { useSelector } from "react-redux";
import { State } from "../context/reducer";

export const useCalculateChartStats = () => {
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
    const typedWordDataset = wordList.slice(0, typedHistory.length);
    const charactersPerWord = typedHistory.map((word) => word.length);
    const wpmDataset = charactersPerWord.map((value, index) =>
        Math.round(
            (value * 60) / (parseInt(typedDurationHistory[index]) / 1000) / 5
        )
    );
    // map through typedHistory then match index of word from typedHistory to the idx in incorrectCharsHistory, minus the incorrect chars of the word from typedHistory from incorrectCharsHistory

    const wordNumberLabels = Array.from(
        { length: typedWordDataset.length },
        (_, i) => i + 1
    );
    const incorrectCharsDataset = incorrectCharsHistory.map(
        (value, _) => value.totalIncorrectCharacters
    );

    return {
        typedWordDataset,
        wordNumberLabels,
        wpmDataset,
        incorrectCharsDataset,
    };
};

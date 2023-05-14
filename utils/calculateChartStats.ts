import { useSelector } from "react-redux";
import { State } from "../context/reducer";

export const calculateChartStats = () => {
    const {
        word: { typedDurationHistory, typedHistory, wordList },
    } = useSelector((state: State) => state);

    const newTypedHistory = wordList.slice(0, typedHistory.length);
    const charactersPerWord = typedHistory.map((word) => word.length);
    const wpmData = charactersPerWord.map((value, index) =>
        Math.round(
            (value * 60) / (parseInt(typedDurationHistory[index]) / 1000) / 5
        )
    );
    const xAxisData = Array.from(
        { length: newTypedHistory.length },
        (_, i) => i + 1
    );

    return { newTypedHistory, xAxisData, wpmData };
};

import {
    appendTypedHistory,
    backtrackWord,
    setTypedWord,
    setTimerId,
    setWordList,
    timerSet,
    timerDecrement,
    setTestTaken,
    setTypedWordDuration,
    setStartTime,
    setIncorrectChar,
} from "../context/actions";
import { store } from "../context/store";

const handleBackspace = (ctrlKey: boolean) => {};

export const recordTest = (key: string, ctrlKey: boolean) => {};

export const resetTest = () => {};

export const startTimer = () => {
    const { dispatch } = store;
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
    });
    dispatch(setTestTaken(formattedDate));
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 1000);
    dispatch(setTimerId(timerId));
};

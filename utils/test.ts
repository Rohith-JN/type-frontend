import {
    setTimerId,
    setWordList,
    timerSet,
    timerDecrement,
    setTestTaken,
} from "../context/actions";
import { store } from "../context/store";

export const recordTest = () => {
    const { getState } = store;
    const {
        time: { timer, timerId },
    } = getState();
    if (!timer) {
        return;
    }
    if (!timerId) {
        startTimer();
    }
};

export const resetTest = () => {
    const { dispatch, getState } = store;
    const {
        time: { timerId },
        preferences: { time },
    } = getState();
    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
    }
    import(`../public/english.json`).then((words) =>
        dispatch(setWordList(words.default))
    );
    dispatch(timerSet(time));
};

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

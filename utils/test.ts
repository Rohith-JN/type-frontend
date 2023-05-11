import {
    appendTypedHistory,
    backtrackWord,
    setTypedWord,
    setTimerId,
    setWordList,
    timerSet,
    timerDecrement,
    setTestTaken,
} from "../context/actions";
import { store } from "../context/store";

const handleBackspace = (ctrlKey: boolean) => {
    const { dispatch, getState } = store;
    const {
        word: { typedWord, activeWordRef, typedHistory, wordList },
    } = getState();
    const currIdx = typedHistory.length - 1;
    const currWordEl = activeWordRef?.current!;
    if (!typedWord && typedHistory[currIdx] !== wordList[currIdx]) {
        dispatch(backtrackWord(ctrlKey));
        currWordEl.previousElementSibling!.classList.remove("right", "wrong");
        if (ctrlKey) {
            currWordEl.previousElementSibling!.childNodes.forEach(
                (char: HTMLSpanElement) => {
                    char.classList.remove("wrong", "right");
                }
            );
        }
    } else {
        if (ctrlKey) {
            dispatch(setTypedWord(""));
            currWordEl.childNodes.forEach((char: HTMLSpanElement) => {
                char.classList.remove("wrong", "right");
            });
        } else {
            const newTypedWord = typedWord.slice(0, typedWord.length - 1);
            dispatch(setTypedWord(newTypedWord));
        }
    }
};

export const recordTest = (key: string, ctrlKey: boolean) => {
    const { dispatch, getState } = store;
    const {
        time: { timer, timerId },
        word: { typedWord, currWord, activeWordRef, caretRef },
    } = getState();
    if (!timer) {
        return;
    }
    if (!timerId) {
        startTimer();
    }
    const currWordEl = activeWordRef?.current!;
    currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });
    const caret = caretRef?.current!;
    caret.classList.remove("blink");
    setTimeout(() => caret.classList.add("blink"), 500);
    switch (key) {
        case " ":
            if (typedWord === "") return;
            currWordEl.classList.add(
                typedWord !== currWord ? "wrong" : "right"
            );
            dispatch(appendTypedHistory());
            break;
        case "Backspace":
            handleBackspace(ctrlKey);
            break;
        default:
            dispatch(setTypedWord(typedWord + key));
            break;
    }
};

export const resetTest = () => {
    const wordElements = document.getElementsByClassName("word");
    if (wordElements.length > 0) {
        wordElements[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const { dispatch, getState } = store;
    const {
        time: { timerId },
        preferences: { time },
    } = getState();
    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));
    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
    }
    import(`../data/english.json`).then((words) =>
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
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    dispatch(setTestTaken(formattedDate));
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 1000);
    dispatch(setTimerId(timerId));
};

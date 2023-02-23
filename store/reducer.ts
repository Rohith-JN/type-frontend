import { RefObject } from "react";
import { AnyAction, combineReducers } from "redux";
import {
    SET_CHAR,
    SET_WORD,
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    APPEND_TYPED_HISTORY,
    PREV_WORD,
    SET_WORDLIST,
    SET_TIME,
    SET_REF,
    SET_CARET_REF,
} from "./actions";

export interface State {
    preferences: {
        time: number; // user preferred time limit
    };
    word: {
        currWord: string;
        typedWord: string;
        typedHistory: string[];
        wordList: string[];
        activeWordRef: RefObject<HTMLDivElement> | null;
        caretRef: RefObject<HTMLSpanElement> | null;
    };
    time: {
        timer: number; // represents remaining time for a timer
        timerId: NodeJS.Timeout | null; // used to clear timer interval when test is reset or completed
    };
}

export const initialState: State = {
    preferences: {
        time: 0,
    },
    word: {
        currWord: "",
        typedWord: "",
        typedHistory: [],
        wordList: [],
        activeWordRef: null,
        caretRef: null,
    },
    time: {
        timer: 1,
        timerId: null,
    },
};

const timerReducer = (
    state = initialState.time,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case TIMER_DECREMENT:
            return { ...state, timer: state.timer - 1 };
        case TIMER_SET:
            return { ...state, timer: payload };
        case TIMERID_SET:
            return { ...state, timerId: payload };
        default:
            return state;
    }
};

const wordReducer = (
    state = initialState.word,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_CHAR:
            return { ...state, typedWord: payload };
        case SET_WORD:
            return { ...state, typedHistory: [...state.typedHistory, payload] };
        case APPEND_TYPED_HISTORY:
            const nextIdx = state.typedHistory.length + 1;
            return {
                ...state,
                typedWord: "",
                currWord: state.wordList[nextIdx],
                typedHistory: [...state.typedHistory, state.typedWord],
            };
        case PREV_WORD:
            const prevIdx = state.typedHistory.length - 1;
            return {
                ...state,
                currWord: state.wordList[prevIdx],
                typedWord: !payload ? state.typedHistory[prevIdx] : "",
                typedHistory: state.typedHistory.splice(0, prevIdx),
            };
        case SET_REF:
            return {
                ...state,
                activeWordRef: payload,
            };
        case SET_CARET_REF:
            return {
                ...state,
                caretRef: payload,
            };
        case SET_WORDLIST:
            if (Array.isArray(payload)) {
                const areNotWords = payload.some((word: string) =>
                    word.includes(" ")
                );
                var shuffledWordList: string[] = payload.sort(
                    () => Math.random() - 0.5
                );
                if (areNotWords)
                    shuffledWordList = payload.flatMap((token: string) =>
                        token.split(" ")
                    );
                return {
                    ...state,
                    typedWord: "",
                    typedHistory: [],
                    currWord: shuffledWordList[0],
                    wordList: shuffledWordList,
                };
            }

        default:
            return state;
    }
};

const preferenceReducer = (
    state = initialState.preferences,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_TIME:
            return {
                ...state,
                time: payload,
            };
        default:
            return state;
    }
};

export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
});
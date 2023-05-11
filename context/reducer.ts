import { RefObject } from "react";
import { AnyAction, combineReducers } from "redux";
import {
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    APPEND_TYPED_HISTORY,
    PREV_WORD,
    SET_WORDLIST,
    SET_TIME,
    SET_REF,
    SET_CARET_REF,
    SET_RESULT,
    SET_PALLET,
    SET_THEME,
    SET_TEST_TAKEN,
    SET_WORD,
} from "./actions";

export interface State {
    preferences: {
        time: number; // user preferred time limit
        palette: boolean;
        theme: string;
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
        testTaken: string;
    };
    result: {
        results: [
            {
                wpm: number;
                accuracy: number;
                correctWords: number;
                incorrectWords: number;
                time: number;
                testTaken: string;
            }
        ];
    };
}

export const initialState: State = {
    preferences: {
        time: 0,
        palette: false,
        theme: "",
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
        testTaken: "",
    },
    result: {
        results: [
            {
                wpm: 0,
                accuracy: 0,
                correctWords: 0,
                incorrectWords: 0,
                time: 0,
                testTaken: "",
            },
        ],
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
        case SET_TEST_TAKEN:
            return {
                ...state,
                testTaken: payload,
            };
        default:
            return state;
    }
};

const wordReducer = (
    state = initialState.word,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_WORD:
            return { ...state, typedWord: payload }; // set typed word
        case APPEND_TYPED_HISTORY:
            const nextIdx = state.typedHistory.length + 1;
            return {
                ...state,
                typedWord: "", // sets the typedWord to ""
                currWord: state.wordList[nextIdx], // sets the next word to be typed
                typedHistory: [...state.typedHistory, state.typedWord],
            }; // after used finishes typing a word, it updates typedHistory with the typed word
        case PREV_WORD:
            const prevIdx = state.typedHistory.length - 1; // index of the previous word
            return {
                ...state,
                currWord: state.wordList[prevIdx], // set the word to be typed as the previous word
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
                var shuffledWordList: string[] = payload.sort(
                    () => Math.random() - 0.5
                );
                return {
                    ...state,
                    typedWord: "", // set typedWord empty as the wordList has been initialised
                    typedHistory: [], // set typedHistory to [] as the wordList has been initialised
                    currWord: shuffledWordList[0], // set word to be typed as the first word in wordList
                    wordList: shuffledWordList, // set new wordList
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
        case SET_THEME:
            return { ...state, theme: payload };
        case SET_PALLET:
            return {
                ...state,
                palette: payload,
            };
        default:
            return state;
    }
};

const resultReducer = (
    state = initialState.result,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_RESULT:
            return { ...state, results: payload };
        default:
            return state;
    }
};

export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
    result: resultReducer,
});

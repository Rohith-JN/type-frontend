import { AnyAction } from "redux";
import {
    SET_TIME,
    SET_RESULT,
    TIMER_DECREMENT,
    TIMER_SET,
    TIMERID_SET,
    SET_TEST_TAKEN,
    APPEND_TYPED_HISTORY,
    SET_WORD,
    PREV_WORD,
    SET_CARET_REF,
    SET_INCORRECT_CHAR,
    SET_REF,
    SET_START_TIME,
    SET_WORDLIST,
    SET_WORD_DURATION,
} from "./actions";
import { initialState } from "./state";

export const preferenceReducer = (
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

export const resultReducer = (
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

export const wordReducer = (
    state = initialState.word,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_WORD:
            return { ...state, typedWord: payload }; // set typed word
        case SET_START_TIME:
            return { ...state, startTime: payload };
        case SET_WORD_DURATION:
            return { ...state, typedWordDuration: payload };
        case APPEND_TYPED_HISTORY:
            const nextIdx = state.typedHistory.length + 1;
            return {
                ...state,
                typedWord: "", // sets the typedWord to ""
                currWord: state.wordList[nextIdx], // sets the next word to be typed
                typedHistory: [...state.typedHistory, state.typedWord],
                incorrectCharsHistory: [
                    ...state.incorrectCharsHistory,
                    state.incorrectChars,
                ],
                typedDurationHistory: [
                    ...state.typedDurationHistory,
                    state.typedWordDuration,
                ],
            }; // after used finishes typing a word, it updates typedHistory with the typed word
        case PREV_WORD:
            // initial incorrect chars if reverted to correct chars are counted as correct chars in the end
            var prevIdx = state.typedHistory.length - 1; // index of the previous word
            return {
                ...state,
                currWord: state.wordList[prevIdx], // set the word to be typed as the previous word
                typedWord: !payload ? state.typedHistory[prevIdx] : "",
                typedHistory: state.typedHistory.splice(0, prevIdx),
                typedWordDuration: state.typedDurationHistory[prevIdx],
                typedDurationHistory: state.typedDurationHistory.splice(
                    0,
                    prevIdx
                ),
                incorrectChars: state.incorrectCharsHistory[prevIdx],
                incorrectCharsHistory: state.incorrectCharsHistory.splice(
                    0,
                    prevIdx
                ),
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
                const shuffledWordList = [...payload].sort(
                    () => Math.random() - 0.5
                );
                return {
                    ...state,
                    typedWordDuration: "",
                    typedDurationHistory: [],
                    incorrectChars: {
                        word: "",
                        idx: 0,
                        totalIncorrectCharacters: 0,
                        incorrectCharacters: 0,
                        extraCharacters: 0,
                    },
                    incorrectCharsHistory: [],
                    typedWord: "", // set typedWord empty as the wordList has been initialised
                    typedHistory: [], // set typedHistory to [] as the wordList has been initialised
                    currWord: shuffledWordList[0], // set word to be typed as the first word in wordList
                    wordList: shuffledWordList, // set new wordList
                };
            }
        case SET_INCORRECT_CHAR:
            return {
                ...state,
                incorrectChars: payload,
            };
        default:
            return state;
    }
};

export const timerReducer = (
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

export default timerReducer;

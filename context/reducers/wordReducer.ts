import { AnyAction } from "redux";
import {
    SET_WORD,
    SET_START_TIME,
    SET_WORD_DURATION,
    APPEND_TYPED_HISTORY,
    PREV_WORD,
    SET_REF,
    SET_CARET_REF,
    SET_WORDLIST,
    SET_INCORRECT_CHAR,
} from "../actions";
import { initialState } from "../state";

const wordReducer = (
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
                var shuffledWordList: string[] = payload.sort(
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

export default wordReducer;

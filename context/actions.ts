export const SET_START_TIME = "SETSTARTTIME";
export const TIMER_DECREMENT = "TIMERDECREMENT";
export const TIMER_SET = "TIMERSET";
export const TIMERID_SET = "TIMERIDSET";
export const SET_TIME = "SETTIME";
export const SET_RESULT = "SETRESULT";
export const SET_TEST_TAKEN = "SETTESTTAKEN";
export const SET_WORD_LIST = "SETWORDLIST";
export const APPEND_TYPED_HISTORY = "APPENDTYPEDHISTORY";
export const SET_WORD_DURATION = "SETWORDDURATION";
export const SET_WORD = "SETWORD";
export const SET_WORDLIST = "SETWORDLIST";
export const SET_THEME = "SETTHEME";
export const SET_PALLET = "SETPALLET";
export const SET_INCORRECT_CHAR = "SETINCORRECTCHAR";

// Time Actions
export const timerDecrement = () => ({ type: TIMER_DECREMENT });
export const timerSet = (payload: number) => ({ type: TIMER_SET, payload });
export const setTimerId = (payload: NodeJS.Timer | null) => ({
    type: TIMERID_SET,
    payload,
});
export const setTestTaken = (payload: string) => ({
    type: SET_TEST_TAKEN,
    payload,
});

// Word Actions
export const setTypedWord = (payload: string) => ({ type: SET_WORD, payload });
export const setTypedWordDuration = (payload: string) => ({
    type: SET_WORD_DURATION,
    payload,
});
export const setIncorrectChar = (payload: {
    word: string;
    idx: number;
    totalIncorrectCharacters: number;
    incorrectCharacters: number;
    extraCharacters: number;
}) => ({
    type: SET_INCORRECT_CHAR,
    payload,
});
export const appendTypedHistory = () => ({
    type: APPEND_TYPED_HISTORY,
});
export const setWordList = (payload: string[]) => ({
    type: SET_WORDLIST,
    payload,
});
// Prefrences Actions
export const setTime = (payload: number) => ({ type: SET_TIME, payload });
export const setPallet = (payload: boolean) => ({
    type: SET_PALLET,
    payload,
});
export const setTheme = (payload: string) => ({
    type: SET_THEME,
    payload: payload ? payload : "superuser",
});

// Result Actions
export const setResult = (payload: Array<object>) => ({
    type: SET_RESULT,
    payload,
});

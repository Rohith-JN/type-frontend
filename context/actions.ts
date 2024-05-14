export const SET_START_TIME = "SETSTARTTIME";
export const TIMER_DECREMENT = "TIMERDECREMENT";
export const TIMER_SET = "TIMERSET";
export const TIMERID_SET = "TIMERIDSET";
export const SET_TIME = "SETTIME";
export const SET_RESULT = "SETRESULT";
export const SET_TEST_TAKEN = "SETTESTTAKEN";

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
export const setStartTime = (payload: number) => ({
    type: SET_START_TIME,
    payload,
});
// Prefrences Actions
export const setTime = (payload: number) => ({ type: SET_TIME, payload });

// Result Actions
export const setResult = (payload: Array<object>) => ({
    type: SET_RESULT,
    payload,
});

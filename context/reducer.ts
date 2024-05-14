import { AnyAction } from "redux";
import {
    SET_TIME,
    SET_RESULT,
    TIMER_DECREMENT,
    TIMER_SET,
    TIMERID_SET,
    SET_TEST_TAKEN,
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

export const wordReducer = (state = initialState.word, {}: AnyAction) => {
    null;
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

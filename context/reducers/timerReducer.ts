import { AnyAction } from "redux";
import {
    TIMER_DECREMENT,
    TIMER_SET,
    TIMERID_SET,
    SET_TEST_TAKEN,
} from "../actions";
import { initialState } from "../state";

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

export default timerReducer;

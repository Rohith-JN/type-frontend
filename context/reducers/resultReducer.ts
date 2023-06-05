import { AnyAction } from "redux";
import { SET_RESULT } from "../actions";
import { initialState } from "../state";

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

export default resultReducer;

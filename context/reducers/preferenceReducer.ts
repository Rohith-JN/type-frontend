import { AnyAction } from "redux";
import { SET_TIME, SET_THEME, SET_PALLET } from "../actions";
import { initialState } from "../state";

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

export default preferenceReducer;

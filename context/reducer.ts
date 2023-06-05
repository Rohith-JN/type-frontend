import { combineReducers } from "redux";
import preferenceReducer from "./reducers/preferenceReducer";
import resultReducer from "./reducers/resultReducer";
import timerReducer from "./reducers/timerReducer";
import wordReducer from "./reducers/wordReducer";

export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
    result: resultReducer,
});

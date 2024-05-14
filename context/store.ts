import { configureStore } from "@reduxjs/toolkit";
import {
    timerReducer,
    wordReducer,
    preferenceReducer,
    resultReducer,
} from "./reducer";

export const store = configureStore({
    reducer: {
        time: timerReducer,
        preferences: preferenceReducer,
        result: resultReducer,
    },
});

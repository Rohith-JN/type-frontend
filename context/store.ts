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
        word: wordReducer,
        preferences: preferenceReducer,
        result: resultReducer,
    },
});

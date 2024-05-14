import { setTimerId, timerDecrement, setTestTaken } from "../context/actions";
import { store } from "../context/store";

export const startTimer = () => {
    const { dispatch } = store;
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
    });
    dispatch(setTestTaken(formattedDate));
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 1000);
    dispatch(setTimerId(timerId));
};

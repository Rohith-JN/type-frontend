import styles from '../styles/Header.module.css'
import { useMemo, useState } from 'react';
import NavOption from '../components/NavOption';
import { resetTest } from "../utils/test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTime,
    setWordList,
    timerSet,
} from "../store/actions";
import { State } from "../store/reducer";
import useLocalStorage from '../hooks/useLocalStorage';

export const Header = () => {
    const {
        preferences: { time },
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(2);
    const [option, setOption] = useLocalStorage("time", time || 60);

    const wordOptions = useMemo(() => [
        { id: 1, optionText: 15 },
        { id: 2, optionText: 30 },
        { id: 3, optionText: 45 },
        { id: 4, optionText: 60 },
        { id: 5, optionText: 120 },
    ], []);

    // initial setup of time property
    // get time from localStorage and set it to timer and time
    useEffect(() => {
        import(`../data/english.json`).then((words) =>
            dispatch(setWordList(words))
        );
        dispatch(timerSet(option));
        dispatch(setTime(option));
        setSelectedOption(wordOptions.find(opt => opt.optionText === option)?.id || 2);
    }, [dispatch, option, wordOptions]);

    useEffect(() => {
        resetTest()
        dispatch(setTime(option))
        dispatch(timerSet(option));
    }, [dispatch, option])

    return (
        <div className={styles.Container}>
            <div className={styles.NavBar} style={{ width: "27%" }}>
                <h1 className={styles.NavText} style={{ color: 'var(--main-color)' }}>words</h1>
                <div className={styles.Divider}></div>
                {wordOptions.map((option) => (
                    <NavOption
                        key={option.id}
                        optionText={option.optionText}
                        isSelected={option.id === selectedOption}
                        onClick={() => {
                            setSelectedOption(option.id);
                            setOption(option.optionText);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
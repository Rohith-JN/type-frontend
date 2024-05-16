import styles from '../../styles/Header.module.css'
import { useMemo } from 'react';
import Option from '../other/Option';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTime,
    setWordList,
    timerSet,
} from "../../context/actions";
import { State } from "../../context/state";
import useLocalStorage from '../../hooks/useLocalStorage';
import { resetTest } from '../../utils/test';

const Header = () => {
    const timeOptions = useMemo(() => [
        { id: 1, optionText: 15 },
        { id: 2, optionText: 30 },
        { id: 3, optionText: 45 },
        { id: 4, optionText: 60 },
        { id: 5, optionText: 120 },
    ], []);

    const { time } = useSelector((state: State) => state.preferences);

    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useLocalStorage("selectedOption", timeOptions.find(opt => opt.optionText === time)?.id || 4);
    const [option, setOption] = useLocalStorage("time", time || 60);

    useEffect(() => {
        import(`../../public/english.json`).then((words) =>
            dispatch(setWordList(words))
        );
        dispatch(timerSet(option));
        dispatch(setTime(option));
        setSelectedOption(timeOptions.find(opt => opt.optionText === option)?.id || 4);
    }, [dispatch, option]);

    useEffect(() => {
        resetTest()
        dispatch(setTime(option))
        dispatch(timerSet(option));
    }, [dispatch, option])

    return (
        <div className={styles.Container}>
            <div className={styles.NavBar}>
                {timeOptions.map((option) => (
                    <Option
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

export default Header
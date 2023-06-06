import styles from '../../styles/Header.module.css'
import { useMemo } from 'react';
import Option from '../other/Option';
import { resetTest } from "../../utils/test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setPallet,
    setTheme,
    setTime,
    setWordList,
    timerSet,
} from "../../context/actions";
import { State } from "../../context/state";
import useLocalStorage from '../../hooks/useLocalStorage';
import Palette from '../other/Palette';
import { useCookies } from 'react-cookie';

const themeOptions: string[] = [
    "superuser",
    "pink",
    "aether",
    "alduin",
    "arch",
    "aurora",
    "bushido",
    "carbon",
    "dark",
    "dev",
    "drowning",
    "gruvbox",
    "matrix",
    "metaverse",
    "miami",
    "mountain",
    "nord",
    "paper",
    "pulse",
    "scalene",
    "shadow",
    "stealth",
    "viridescent",
    "vscode",
    "weird",
].sort();

const Header = () => {
    const timeOptions = useMemo(() => [
        { id: 1, optionText: 15 },
        { id: 2, optionText: 30 },
        { id: 3, optionText: 45 },
        { id: 4, optionText: 60 },
        { id: 5, optionText: 120 },
    ], []);

    const {
        preferences: { time, palette, theme },
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useLocalStorage("selectedOption", timeOptions.find(opt => opt.optionText === time)?.id || 4);
    const [option, setOption] = useLocalStorage("time", time || 60);
    const [cookies, setCookie] = useCookies(["theme", "language"])

    useEffect(() => {
        if (!cookies.theme) {
            setCookie("theme", "superuser", {
                path: "/",
                maxAge: 60 * 60 * 60 * 60 * 60,
                sameSite: true,
            })
        }
    }, [cookies.theme, dispatch, setCookie])

    useEffect(() => {
        dispatch(setTheme(cookies.theme))
        document.documentElement.setAttribute("data-theme", cookies.theme);
    }, [cookies.theme, dispatch]);

    const onThemeClick = (option: string) => {
        dispatch(setTheme(option));
        setCookie("theme", option, {
            path: "/",
            maxAge: 60 * 60 * 60 * 60 * 60,
            sameSite: true,
        })
    }

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
                <div className={`${styles.Divider} ${styles.theme}`}></div>
                <h1 className={`${styles.NavText} ${styles.theme}`} style={{ color: 'var(--sub-color)' }} onClick={() => {
                    dispatch(setPallet(true))
                }
                }>{theme}</h1>
            </div>
            <Palette
                open={palette}
                callback={function (option: string): void {
                    onThemeClick(option);
                }}
                options={themeOptions}
            />
        </div>
    );
}

export default Header
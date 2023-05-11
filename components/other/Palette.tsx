import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/Palette.module.css";
import { useDispatch } from "react-redux";
import {
    FaSearch,
} from "react-icons/fa";
import { setPallet, setTheme } from "../../context/actions";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useCookies } from "react-cookie"

const Options: string[] = [
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

const filter = (options: typeof Options, query: string) => {
    if (!query) return options;

    return options.filter((option) => {
        const optionText = option.toLowerCase();
        return optionText.includes(query.toLowerCase());
    });
};

const Palette = ({ open }: { open: boolean }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(["theme"])

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.currentTarget.value);
    };

    const filteredResults = filter(Options, searchQuery);

    const divRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(divRef, () => { setSearchQuery(""); dispatch(setPallet(false)); });

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
    }, [cookies.theme, dispatch]);

    useEffect(
        () => document.addEventListener("keydown", (e) => e.key === " " && setSearchQuery("")), []
    );

    useEffect(() => {
        open && inputRef.current!.focus();
    }, [open]);

    return (
        <>
            {open && (
                <div className={styles.palette} role="dialog" aria-modal="true">
                    <div className={styles.wrapper}>
                        <div className={styles.contents} ref={divRef}>
                            <div className={styles.search}>
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Type to Search..."
                                    spellCheck="false"
                                    className={styles.input}
                                    ref={inputRef}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className={styles.options}>
                                {filteredResults.map((option, index) => (
                                    <p
                                        className={styles.option}
                                        key={index}
                                        onClick={() => {
                                            dispatch(setTheme(option));
                                            setCookie("theme", option, {
                                                path: "/",
                                                maxAge: 60 * 60 * 60 * 60 * 60,
                                                sameSite: true,
                                            })
                                            window.location.reload();
                                        }}
                                        draggable="false"
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Palette;

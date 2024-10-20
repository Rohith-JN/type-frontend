import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/Palette.module.css";
import { useDispatch } from "react-redux";
import {
    FaSearch,
} from "react-icons/fa";
import { setPallet } from "../../context/actions";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const filter = (options: string[], query: string) => {
    if (!query) return options;

    return options.filter((option) => {
        const optionText = option.toLowerCase();
        return optionText.includes(query.toLowerCase());
    });
};

const Palette = ({ open, callback, options }: { open: boolean, callback: (option: string) => void, options: string[] }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.currentTarget.value);
    };
    const filteredResults = filter(options, searchQuery);
    const divRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(divRef, () => { setSearchQuery(""); dispatch(setPallet(false)); });

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
                                        onClick={() => callback(option)}
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
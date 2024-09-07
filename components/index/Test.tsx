import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendTypedHistory, setIncorrectChar, setTypedWord, setWordList } from "../../context/actions";
import { State } from "../../context/state";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../../utils/test";

const Test = () => {
    const { timer } = useSelector((state: State) => state.time);
    const { wordList, typedHistory, typedWord } = useSelector((state: State) => state.word);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const currentWordRef = useRef<HTMLSpanElement | null>(null);

    const [typedChars, setTypedChars] = useState<string[]>([]); // Track characters for current word

    useEffect(() => {
        import("../../public/english.json").then((words) =>
            dispatch(setWordList(words.default))
        );
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue.endsWith(" ")) {
            const currWord = inputValue.trim();
            const wordIndex = typedHistory.length;
            const word = wordList[wordIndex];
            const isExcessLength = currWord.length > word.length;
            const isIncomplete = currWord.length >= 0 && currWord.length < word.length && typedHistory.includes(currWord);
            const incorrectChars = currWord.split("")
                .slice(0, word.length)
                .filter((char, index) => char !== word[index]).length
                + (isIncomplete ? word.length - currWord.length : 0);
            const extraChars = (isExcessLength ? currWord.length - word.length : 0)
            const totalIncorrectChars = incorrectChars + extraChars
            dispatch(setIncorrectChar({ word: word, idx: wordIndex, totalIncorrectCharacters: totalIncorrectChars, incorrectCharacters: incorrectChars, extraCharacters: extraChars }))
            dispatch(appendTypedHistory())
            setTypedChars([]);
        } else {
            dispatch(setTypedWord(inputValue))
            setTypedChars(inputValue.split(""));
        }
    };
    useEffect(() => {
        // Scroll to the current word when typedHistory updates
        if (currentWordRef.current) {
            currentWordRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [typedHistory, typedWord]);

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <div className="test">
                <div className="box">
                    <p className="word">
                        {wordList.map((word, wordIndex) => {
                            const currWord = typedHistory[wordIndex] || "";
                            const isCurrentWord = wordIndex === typedHistory.length;
                            const hasWrongChars = currWord.split("").some((char, index) => char !== word[index]);
                            const isExcessLength = currWord.length > word.length;
                            const isIncomplete = currWord.length >= 0 && currWord.length < word.length && typedHistory.includes(currWord);
                            const shouldHighlightWordRed = hasWrongChars || isExcessLength || isIncomplete;
                            return (
                                <span key={wordIndex} ref={isCurrentWord ? currentWordRef : null}>
                                    {word.split("").map((char, charIndex) => {
                                        let charColor = "#fff";

                                        if (wordIndex < typedHistory.length) {
                                            charColor = shouldHighlightWordRed ? "red" : "green";
                                        } else if (isCurrentWord) {
                                            const typedChar = typedChars[charIndex] || "";
                                            charColor = typedChar === char ? "green" : typedChar !== "" ? "red" : "#fff";
                                        }

                                        return (
                                            <span key={charIndex} style={{ color: charColor, backgroundColor: (isCurrentWord && charIndex === typedChars.length) ? 'grey' : 'transparent', paddingBottom: (isCurrentWord && charIndex === typedChars.length) ? '5px' : '0px', paddingTop: (isCurrentWord && charIndex === typedChars.length) ? '5px' : '0px' }}>{char}</span>
                                        );
                                    })}
                                    {'\u00A0'}
                                </span>
                            );
                        })}
                    </p>
                </div>
                <div style={{ display: "flex", justifyContent: 'row' }}>
                    <input
                        ref={inputRef}
                        value={typedWord}
                        onChange={handleInputChange}
                        style={{
                            backgroundColor: '#1b1b1b',
                            border: '2px solid #007bff',
                            color: '#fff',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '50%',
                            fontSize: '18px',
                            outline: 'none',
                            marginBottom: '20px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Test;

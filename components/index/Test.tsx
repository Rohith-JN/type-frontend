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
    const [rotated, setRotated] = useState(false);

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
        if (currentWordRef.current) {
            const parent = currentWordRef.current.parentElement;
            if (parent) {
                const scrollOffset = currentWordRef.current.offsetTop - parent.offsetTop;
                parent.scrollTop = scrollOffset - 10;  // Adjust scroll amount to fine-tune positioning
            }
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
                                            charColor = shouldHighlightWordRed ? "red" : "var(--main-color)";
                                        } else if (isCurrentWord) {
                                            const typedChar = typedChars[charIndex] || "";
                                            charColor = typedChar === char ? "var(--main-color)" : typedChar !== "" ? "red" : "#fff";
                                        }
                                        return (
                                            <span key={charIndex} style={{ color: charColor }}>{char}</span>
                                        );
                                    })}
                                    {' '}
                                </span>
                            );
                        })}
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', height: '8vh', alignItems: 'center', }}>
                    <input
                        ref={inputRef}
                        value={typedWord}
                        onChange={handleInputChange}
                    />
                    <div style={{ width: '14.5%', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--sub-alt-color)', borderRadius: '5px', }}>
                        <p style={{ fontSize: 20, fontFamily: 'lexend', color: 'var(--text-color)' }}>0{' '}<span style={{ fontSize: 15 }}>WPM</span></p>
                    </div>
                    <div style={{ width: '14.5%', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--sub-alt-color)', borderRadius: '5px', }}>
                        <span style={{
                            fontSize: 20, fontFamily: 'lexend', color: 'var(--text-color)',
                        }}>{timer}s</span>
                    </div>
                    <div style={{ width: '14.5%', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--sub-alt-color)', borderRadius: '5px', cursor: 'pointer' }} onClick={() => {
                        setRotated(!rotated);
                        resetTest();
                    }}>
                        <FiRefreshCcw size={25} color={'var(--text-color)'} className={rotated ? 'icon rotate' : 'icon'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;

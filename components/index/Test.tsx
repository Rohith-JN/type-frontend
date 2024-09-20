import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendTypedHistory, setIncorrectChar, setTimerId, setTypedWord, setWordList, setTypedWordDuration } from "../../context/actions";
import { State } from "../../context/state";
import { FiRefreshCcw } from 'react-icons/fi';
import { recordTest, resetTest } from "../../utils/test";

const Test = () => {
    const { timer, timerId } = useSelector((state: State) => state.time);
    const { wordList, typedHistory, typedWord } = useSelector((state: State) => state.word);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const currentWordRef = useRef<HTMLSpanElement | null>(null);
    const [rotated, setRotated] = useState(false);
    const [test, setTest] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    const [typedChars, setTypedChars] = useState<string[]>([]);

    useEffect(() => {
        import("../../public/english.json").then((words) =>
            dispatch(setWordList(words.default))
        );
    }, [dispatch]);

    useEffect(() => {
        inputRef.current?.focus()
    }, [timer, wordList])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTest(true);
        const inputValue = e.target.value;

        if (inputValue.endsWith(" ")) {
            const currWord = inputValue.trim();
            const wordIndex = typedHistory.length;
            const word = wordList[wordIndex];

            const endTime = new Date().getTime();
            if (startTime) {
                const timeTaken = endTime - startTime!;
                dispatch(setTypedWordDuration(timeTaken.toString()))
            }

            setStartTime(Date.now());

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
            if (startTime === null) {
                setStartTime(new Date().getTime());
            }
            dispatch(setTypedWord(inputValue))
            setTypedChars(inputValue.split(""));
        }
    };

    useEffect(() => {
        if (currentWordRef.current) {
            const parent = currentWordRef.current.parentElement;
            if (parent) {
                const scrollOffset = currentWordRef.current.offsetTop - parent.offsetTop;
                parent.scrollTop = scrollOffset - 10;
            }
        }
    }, [typedHistory, typedWord]);

    useEffect(() => {
        if (test) {
            recordTest()
        }
    }, [test])

    useEffect(() => {
        if (!timer && timerId) {
            clearInterval(timerId);
            dispatch(setTimerId(null));
            setTypedChars([]);
            setTest(false)
        }
    }, [dispatch, timer, timerId]);

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
                                        let charColor = "var(--sub-color)";

                                        if (wordIndex < typedHistory.length) {
                                            charColor = shouldHighlightWordRed ? "red" : "var(--text-color)";
                                        } else if (isCurrentWord) {
                                            const typedChar = typedChars[charIndex] || "";
                                            charColor = typedChar === char ? "var(--text-color)" : typedChar !== "" ? "red" : "var(--sub-color)";
                                        }
                                        return (
                                            <span key={charIndex} style={{ color: charColor }} className="character">{char}</span>
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
                        type="text" autoCorrect="off" autoCapitalize="none"
                        ref={inputRef}
                        value={typedWord}
                        onChange={handleInputChange}
                        disabled={timer ? false : true}
                        autoFocus={true}
                    />
                    <div className="timer">
                        <span style={{
                            fontSize: 20, fontFamily: 'lexend', color: 'var(--text-color)',
                        }}>{timer}s</span>
                    </div>
                    <div className="reset" onClick={() => {
                        setRotated(!rotated);
                        resetTest();
                        setTypedChars([]);
                        setTest(false)
                    }}>
                        <FiRefreshCcw size={25} color={'var(--text-color)'} className={rotated ? 'icon rotate' : 'icon'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;

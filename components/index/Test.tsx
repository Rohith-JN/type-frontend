import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "../../context/actions";
import { State } from "../../context/reducer";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../../utils/test";

const Test = () => {
    const {
        time: { timer },
        word: { currWord, wordList, typedHistory, typedWord, incorrectCharsHistory },
    } = useSelector((state: State) => state);

    const dispatch = useDispatch();
    const extraLetters = typedWord.slice(currWord.length).split("");
    const activeWord = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);

    // currWord is the word thats supposed to be typed
    // typedWWord is the word thats typed by the user
    // extraLetters extracted part of the typedWord that comes after currWord into an array of letters

    useEffect(() => {
        dispatch(setRef(activeWord));
        dispatch(setCaretRef(caretRef));
    }, [dispatch]);

    return (
        <div style={{ display: "flex", width: "100", justifyContent: "center" }}>
            <div className="test">
                <div className="stats">
                    <div className="timer">{timer}</div>
                </div>
                <div className="box">
                    {wordList.map((word, idx) => {
                        const isActive =
                            currWord === word && typedHistory.length === idx; // if currentWord = word from wordlist && typed words length = index of current word
                        return (
                            <div
                                key={word + idx}
                                className="word"
                                ref={isActive ? activeWord : null}>
                                {isActive ? (
                                    <span
                                        ref={caretRef}
                                        id="caret"
                                        className="blink"
                                        style={{
                                            left: typedWord.length * 12.5833, // change based on letter
                                        }}>
                                        |
                                    </span>
                                ) : null}
                                {word.split("").map((char, charId) => { // wordList for the type test
                                    return <span key={char + charId}>{char}</span>;
                                })}
                                {isActive
                                    ? extraLetters.map((char, charId) => {
                                        // dispatch extra letters
                                        return (
                                            <span
                                                key={char + charId}
                                                className="wrong extra">
                                                {char}
                                            </span>
                                        );
                                    })
                                    : typedHistory[idx] // words typed by the user already
                                        ? typedHistory[idx]
                                            .slice(wordList[idx].length)
                                            .split("")
                                            .map((char, charId) => {
                                                return (
                                                    <span
                                                        key={char + charId}
                                                        className="wrong extra">
                                                        {char}
                                                    </span>
                                                );
                                            })
                                        : null}
                            </div>
                        );
                    })}
                </div>
                <div style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "30px" }}>
                    <FiRefreshCcw style={{ width: "28px", height: "auto", cursor: "pointer", color: "var(--sub-color)" }} onClick={resetTest} />
                </div>
            </div>
        </div>
    );
}

export default Test
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "../store/actions";
import { State } from "../store/reducer";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../utils/test";

const Test = () => {
    const {
        word: { typedWord, currWord, wordList, typedHistory },
        time: { timer },
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const extraLetters = typedWord.slice(currWord.length).split("");
    const activeWord = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        dispatch(setRef(activeWord));
        dispatch(setCaretRef(caretRef));
    }, [dispatch]);

    return (
        <div style={{ display: "flex", width: "100", justifyContent: "center", marginTop: "5.5rem" }}>
            <div className="test">
                <div className="timer">{timer}</div>
                <div className="box">
                    {wordList.map((word, idx) => {
                        const isActive =
                            currWord === word && typedHistory.length === idx;
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
                                {word.split("").map((char, charId) => {
                                    return <span key={char + charId}>{char}</span>;
                                })}
                                {isActive
                                    ? extraLetters.map((char, charId) => {
                                        return (
                                            <span
                                                key={char + charId}
                                                className="wrong extra">
                                                {char}
                                            </span>
                                        );
                                    })
                                    : typedHistory[idx]
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
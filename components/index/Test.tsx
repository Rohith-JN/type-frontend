import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "../../context/actions";
import { State } from "../../context/state";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../../utils/test";

const Test = () => {
    const { timer } = useSelector((state: State) => state.time);
    const { currWord, wordList, typedHistory, typedWord } = useSelector((state: State) => state.word);

    const dispatch = useDispatch();

    const extraLetters = typedWord.slice(currWord.length).split("");
    const activeWord = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);

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
                <div style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "30px" }}>
                    <FiRefreshCcw style={{ width: "28px", height: "auto", cursor: "pointer", color: "var(--sub-color)" }} onClick={resetTest} />
                </div>
            </div>
        </div>
    );
}

export default Test
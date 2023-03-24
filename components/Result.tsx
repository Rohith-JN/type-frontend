import styles from '../styles/Result.module.css';
import { useSelector } from "react-redux";
import { State } from "../store/reducer";
import { useEffect, useState } from 'react';

const Result = () => {
    const {
        time: { timerId, timer },
        word: { currWord, wordList, typedHistory },
        preferences: { time },
        result: { results }
    } = useSelector((state: State) => state);
    const [showResult, setShowResult] = useState(false);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / time / 5;
    const correctWords = result.filter((x) => x).length;
    const incorrectWords = result.filter((x) => !x).length;
    const totalWords = correctWords + incorrectWords;
    const accuracy = (correctWords / totalWords) * 100 ? (correctWords / totalWords) * 100 : 0

    useEffect(() => {
        if (!timer && timerId) {
            results.splice(1, 0, {
                wpm: wpm,
                accuracy: accuracy,
                correctWords: correctWords,
                incorrectWords: incorrectWords,
                time: time,
            });
        }
    }, [timer, timerId])

    useEffect(() => {
        results.length > 1 ? setShowResult(true) : setShowResult(false)
    }, [results.length])

    return (
        <div className={styles.result} style={{ display: showResult ? "flex" : "none" }}>
            <table>
                <thead>
                    <tr>
                        <th>S:No</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Words</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((object, index) => {
                        if (index == 0) {
                            return (
                                <div key={index}></div>
                            );
                        }
                        else {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{Math.round(object.wpm)}</td>
                                    <td>{Math.round(object.accuracy)}%</td>
                                    <td>{object.correctWords}{' '}/{' '}{object.incorrectWords}</td>
                                    <td>{object.time}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Result
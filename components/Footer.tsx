import styles from '../styles/Footer.module.css';
import { useSelector } from "react-redux";
import { State } from "../store/reducer";
import { useEffect } from 'react';
import { insertObject } from '../utils/utils';

const Footer = () => {
    const {
        time: { timerId, timer },
        word: { currWord, wordList, typedHistory },
        preferences: { time },
        result: { results }
    } = useSelector((state: State) => state);
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
            insertObject(results, {
                wpm: ((correctChars + spaces) * 60) / time / 5,
                accuracy: (correctWords / totalWords) * 100 ? (correctWords / totalWords) * 100 : 0,
                correctWords: result.filter((x) => x).length,
                incorrectWords: result.filter((x) => !x).length,
                time: time,
            })
        }
    })

    return (
        <div className={styles.result}>
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
                                <tr key={index}>
                                    <td>current</td>
                                    <td>{Math.round(wpm)}</td>
                                    <td>{Math.round(accuracy)}%</td>
                                    <td>{correctWords}{' '}/{' '}{incorrectWords}</td>
                                    <td>{time}</td>
                                </tr>
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

export default Footer
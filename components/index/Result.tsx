import styles from '../../styles/Result.module.css';
import { useSelector } from "react-redux";
import { State } from "../../store/reducer";
import { useEffect, useState } from 'react';
import { useCreateTestMutation } from '../../generated/graphql';
import firebase from 'firebase/compat/app';
import { round, secondsToTime } from '../../utils/utils';

const Result = () => {
    const {
        time: { timerId, timer, testTaken },
        word: { currWord, wordList, typedHistory },
        preferences: { time },
        result: { results }
    } = useSelector((state: State) => state);
    const [showResult, setShowResult] = useState(false);
    const [, createTest] = useCreateTestMutation();
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
                testTaken: testTaken
            });
        }
    }, [timer, timerId]);

    useEffect(() => {
        async function test() {
            if (firebase.auth().currentUser && !timer && timerId) {
                // use decimal point to 1 for wpm and accuracy
                await createTest({
                    chars: `${correctWords} / ${incorrectWords}`,
                    wpm: Math.round(wpm),
                    accuracy: `${round(accuracy, 1)}%`,
                    time: `${time}`,
                    uid: `${firebase.auth().currentUser!.uid}`,
                    testTaken: testTaken
                })
            }
        }
        test()
    }, [timer, timerId]);

    useEffect(() => {
        results.length > 1 ? setShowResult(true) : setShowResult(false)
    }, [results.length])

    return (
        <div className={styles.result} style={{ display: showResult ? "flex" : "none" }}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.sno}>S:No</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Words</th>
                        <th>Time</th>
                        <th className={styles.testTaken}>Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((object, index) => {
                        if (index == 0) {
                            return (
                                <></>
                            );
                        }
                        else {
                            return (
                                <tr key={index}>
                                    <td className={styles.sno}>{index}</td>
                                    <td>{Math.round(object.wpm)}</td>
                                    <td>{round(object.accuracy, 1)}%</td>
                                    <td>{object.correctWords}{' '}/{' '}{object.incorrectWords}</td>
                                    <td>{secondsToTime(object.time)}</td>
                                    <td className={styles.testTaken}>{object.testTaken}</td>
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
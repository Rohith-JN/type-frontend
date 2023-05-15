import styles from '../../styles/Result.module.css';
import { useSelector } from "react-redux";
import { State } from "../../context/reducer";
import { useEffect } from 'react';
import { useCreateTestMutation } from '../../generated/graphql';
import firebase from 'firebase/compat/app';
import { round, secondsToTime } from '../../utils/utils';
import { calculateStats } from '../../utils/calculateStats';

const Result = () => {
    const {
        time: { timerId, timer, testTaken },
        preferences: { time },
        result: { results },
    } = useSelector((state: State) => state);
    const [, createTest] = useCreateTestMutation();
    const { wpm, accuracy, incorrectChars, correctChars, rawWpm } = calculateStats();

    useEffect(() => {
        if (!timer && timerId) {
            results.splice(1, 0, {
                wpm: wpm,
                rawWpm: rawWpm,
                accuracy: accuracy,
                correctChars: correctChars,
                incorrectChars: incorrectChars,
                time: time,
                testTaken: testTaken
            });
        }
    }, [timer, timerId]);

    useEffect(() => {
        async function test() {
            if (firebase.auth().currentUser && !timer && timerId) {
                await createTest({
                    chars: `${correctChars} / ${incorrectChars}`,
                    wpm: Math.round(wpm),
                    rawWpm: Math.round(rawWpm),
                    accuracy: round(accuracy, 1),
                    time: `${time}`,
                    uid: `${firebase.auth().currentUser!.uid}`,
                    testTaken: testTaken
                })
            }
        }
        test()
    }, [timer, timerId]);

    return (
        <div className={styles.result}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.sno}>S:No</th>
                        <th>WPM</th>
                        <th>Raw WPM</th>
                        <th>Accuracy</th>
                        <th>Chars</th>
                        <th>Time</th>
                        <th className={styles.testTaken}>Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((object, index) => {
                        if (index == 0) {
                            return null
                        }
                        else {
                            return (
                                <tr key={index}>
                                    <td className={styles.sno}>{index}</td>
                                    <td>{Math.round(object.wpm)}</td>
                                    <td>{Math.round(object.rawWpm)}</td>
                                    <td>{round(object.accuracy, 1)}%</td>
                                    <td>{object.correctChars}{' '}/{' '}{object.incorrectChars}</td>
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
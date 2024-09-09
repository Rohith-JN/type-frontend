import { useSelector } from "react-redux";
import { useCalculateChartStats } from "../../hooks/useCalculateChartStats";
import { round, secondsToTime } from '../../utils/utils';
import Chart from "./Chart"
import { State } from "../../context/state";
import { useEffect } from "react";
import { useCalculateStats } from "../../hooks/useCalculateStats";
import firebase from 'firebase/compat/app';
import { useCreateTestMutation } from "../../graphql/generated/graphql";
import styles from '../../styles/Footer.module.css';
import { customToast, toastOptions } from "../../utils/customToast";
import { setResult } from "../../context/actions";
import { store } from "../../context/store";


const Footer = () => {
    const { timerId, timer, testTaken } = useSelector((state: State) => state.time);
    const { time } = useSelector((state: State) => state.preferences)
    const { results } = useSelector((state: State) => state.result)
    const { dispatch } = store;

    const [, createTest] = useCreateTestMutation();
    const { wpm, accuracy, incorrectChars, correctChars, rawWpm } = useCalculateStats();
    const {
        typedWordDataset,
        wordNumberLabels,
        wpmDataset,
        incorrectCharsDataset,
    } = useCalculateChartStats();

    useEffect(() => {
        if (!timer && timerId) {
            // Create a new array with the updated results, without mutating the original array
            const updatedResults = [
                ...results.slice(0, 1), // elements before index 1
                {
                    wpm: wpm,
                    rawWpm: rawWpm,
                    accuracy: accuracy,
                    correctChars: correctChars,
                    incorrectChars: incorrectChars,
                    time: time,
                    testTaken: testTaken,
                    typedWordDataset: typedWordDataset,
                    wordNumberLabels: wordNumberLabels,
                    wpmDataset: wpmDataset,
                    incorrectCharsDataset: incorrectCharsDataset
                },
                ...results.slice(1) // elements after index 1
            ];

            // Dispatch action to update the results immutably
            dispatch(setResult(updatedResults));
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
                    time: time,
                    uid: `${firebase.auth().currentUser!.uid}`,
                    testTaken: testTaken,
                }).catch((_) => {
                    customToast.error("Failed to save test", toastOptions)
                })
            }
        }
        test()
    }, [timer, timerId]);

    return (
        <div className={styles.footer} style={{ display: "flex" }}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.sno}>S:No</th>
                        <th className={styles.wpm}>WPM</th>
                        <th className={styles.raw}>Raw</th>
                        <th className={styles.acc}>Acc</th>
                        <th className={styles.chars}>Chars</th>
                        <th className={styles.time}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 1 ? results.map((object, index) => {
                        if (index == 0) {
                            return null
                        }
                        else {
                            return (
                                <tr key={index}>
                                    <td className={styles.sno}>{index}</td>
                                    <td className={styles.wpm}>{Math.round(object.wpm)}</td>
                                    <td className={styles.raw}>{Math.round(object.rawWpm)}</td>
                                    <td className={styles.acc}>{round(object.accuracy, 1)}%</td>
                                    <td className={styles.chars}>{object.correctChars}{' '}/{' '}{object.incorrectChars}</td>
                                    <td className={styles.time}>{secondsToTime(object.time)}</td>
                                </tr>
                            );
                        }
                    }) : <tr>
                        <td className={styles.sno}>1</td>
                        <td className={styles.wpm}>0</td>
                        <td className={styles.raw}>0</td>
                        <td className={styles.acc}>0%</td>
                        <td className={styles.chars}>0{' '}/{' '}0</td>
                        <td className={styles.time}>{time}</td>
                    </tr>}
                </tbody>
            </table>
            <div className={styles.chart}>
                {results.length > 1 ? results.map((object, index) => {
                    if (index == 1) {
                        return (
                            <Chart key={index} wpmDataset={object.wpmDataset} wordNumberLables={((object.wordNumberLabels).length === 0) ? [1, 2] : object.wordNumberLabels} typedWordDataset={object.typedWordDataset} incorrectCharsDataset={object.incorrectCharsDataset} />
                        );
                    }
                    else {
                        return null
                    }
                }) : <Chart wpmDataset={[]} wordNumberLables={[1, 2]} typedWordDataset={[]} incorrectCharsDataset={[]} />}
            </div>
        </div>
    )
}

export default Footer
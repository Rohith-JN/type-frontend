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

const Footer = () => {
    const {
        time: { timerId, timer, testTaken },
        preferences: { time },
        result: { results },
    } = useSelector((state: State) => state);
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
            results.splice(1, 0, {
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
                        <td className={styles.sno}>-</td>
                        <td className={styles.wpm}>-</td>
                        <td className={styles.raw}>-</td>
                        <td className={styles.acc}>-</td>
                        <td className={styles.chars}>-{' '}/{' '}-</td>
                        <td className={styles.time}>-</td>
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
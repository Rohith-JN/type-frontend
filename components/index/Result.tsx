import styles from '../../styles/Result.module.css';
import { useSelector } from "react-redux";
import { State } from "../../context/reducer";
import { round, secondsToTime } from '../../utils/utils';

const Result = () => {
    const {
        result: { results },
    } = useSelector((state: State) => state);

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
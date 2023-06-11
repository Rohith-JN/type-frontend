import styles from '../../styles/Account.module.css';
import { secondsToTime } from '../../utils/utils';

const Tests = ({ data, callBack }: { data: any[], callBack: () => void }) => {

    return (
        <div className={styles.tests}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.sno}>S:No</th>
                        <th className={styles.wpm}>WPM</th>
                        <th className={styles.raw}>Raw</th>
                        <th className={styles.acc}>Accuracy</th>
                        <th className={styles.chars}>Chars</th>
                        <th className={styles.time}>Time</th>
                        <th className={styles.taken}>Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((test: any, index: number) => <tr key={index + 1}>
                            <td className={styles.sno}>{index + 1}</td>
                            <td className={styles.wpm}>{test.wpm}</td>
                            <td className={styles.raw}>{test.rawWpm}</td>
                            <td className={styles.acc}>{test.accuracy}%</td>
                            <td className={styles.chars}>{test.chars}</td>
                            <td className={styles.time}>{secondsToTime(test.time)}</td>
                            <td className={styles.taken}>{test.testTaken}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            <button onClick={callBack} disabled={data.length % 10 !== 0}>
                {data.length % 10 === 0 ? "Load more" : "No more tests"}
            </button>
        </div>
    )
}

export default Tests
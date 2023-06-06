import { GetStatsQuery } from '../../graphql/generated/graphql';
import styles from '../../styles/Account.module.css'
import { secondsToTime } from '../../utils/utils';

const Stats = ({ data }: { data: GetStatsQuery }) => {

    return (
        <div className={styles.stats}>
            <p style={{ fontFamily: 'lexend', fontWeight: "light", color: "var(--sub-color)", fontSize: "13px" }}>All Time Average / Past 10 Average</p>
            <table>
                <thead>
                    <tr>
                        <th className={styles.sno}>S:No</th>
                        <th className={styles.time}>Time</th>
                        <th className={styles.pb}>PB</th>
                        <th className={styles.wpm}>WPM</th>
                        <th className={styles.acc}>Accuracy</th>
                        <th className={styles.testsTaken}>Tests taken</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.getStats.userStats.map((stat, index) => <tr key={index + 1}>
                            <td className={styles.sno}>{index + 1}</td>
                            <td className={styles.time}>{secondsToTime(parseInt(stat.time))}</td>
                            <td className={styles.pb}>{stat.pb}</td>
                            <td className={styles.wpm}>
                                {stat.wpm.toString()} / {stat.recentWpm.toString()}</td>
                            <td className={styles.acc}>
                                {stat.accuracy.toString()} / {stat.recentAccuracy.toString()}</td>
                            <td className={styles.testsTaken}>{stat.testsTaken}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div >
    );
}

export default Stats
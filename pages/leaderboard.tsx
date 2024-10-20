import { useEffect, useMemo, useState } from "react";
import styles from '../styles/Leaderboard.module.css'
import { useLeaderboardQuery } from "../graphql/generated/graphql";
import { useAuth } from "../firebase/auth";
import { getTheme } from "../utils/getTheme";
import { NextPageContext } from "next";
import ConditionalRenderer from "../components/other/ConditionalRenderer";
import Option from "../components/other/Option";
import { secondsToTime } from "../utils/utils";

const Leaderboard = ({ themeData }: {
    themeData: {
        [key: string]: string;
    }
}) => {
    const { authUser } = useAuth();
    const uid = (authUser) ? authUser['uid'] : ''
    const wordOptions = useMemo(() => [
        { id: 1, optionText: 15 },
        { id: 2, optionText: 30 },
        { id: 3, optionText: 45 },
        { id: 4, optionText: 60 },
        { id: 5, optionText: 120 },
    ], []);
    const [selectedOption, setSelectedOption] = useState(4);
    const [option, setOption] = useState(60);
    const [{ data, fetching }] = useLeaderboardQuery({
        variables: {
            time: option,
            uid: uid
        }
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", themeData.theme || "");
    }, [themeData.theme]);

    return <ConditionalRenderer data={data ? true : false} fetching={fetching} title={"Type / Leaderboard"}>
        <div className={styles.leaderboard}>
            <p className={styles.info}>All-Time Leaderboard</p>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: "2rem" }}>
                {wordOptions.map((option) => (
                    <Option
                        key={option.id}
                        optionText={option.optionText}
                        isSelected={option.id === selectedOption}
                        onClick={() => {
                            setSelectedOption(option.id);
                            setOption(option.optionText);
                        }}
                    />
                ))}
            </div>
            <div className={styles.leaderboards}>
                <table style={{ paddingTop: "1rem" }}>
                    <thead>
                        <tr>
                            <th className={styles.rank}>Rank</th>
                            <th>User</th>
                            <th>WPM</th>
                            <th className={styles.rawWpm}>Raw</th>
                            <th>Acc</th>
                            <th>Time</th>
                            <th className={styles.taken}>Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.leaderboard.leaderBoard.map((test, index) => <tr key={index}>
                                <td className={styles.rank}>{test.rank}</td>
                                <td>{test.user}</td>
                                <td className={styles.wpm}>{test.wpm}</td>
                                <td className={styles.rawWpm}>{test.rawWpm}</td>
                                <td>{test.accuracy}%</td>
                                <td>{secondsToTime(test.time)}</td>
                                <td className={styles.taken}>{test.testTaken}</td>
                            </tr>)
                        }
                        {(authUser) ? <div style={{ marginTop: "2rem" }}>
                        </div> : null}

                        {(authUser && data?.leaderboard.user.rank !== -1) ?
                            <tr style={{ backgroundColor: "var(--sub-alt-color)" }}>
                                <td className={styles.rank}>{data?.leaderboard.user.rank}</td>
                                <td>{data?.leaderboard.user.user}</td>
                                <td className={styles.wpm}>{data?.leaderboard.user.wpm}</td>
                                <td className={styles.rawWpm}>{data?.leaderboard.user.rawWpm}</td>
                                <td>{data?.leaderboard.user.accuracy}%</td>
                                <td>{secondsToTime(data?.leaderboard.user.time!)}</td>
                                <td className={styles.taken}>{data?.leaderboard.user.testTaken}</td>
                            </tr>
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    </ConditionalRenderer>
}

export default Leaderboard

export async function getServerSideProps(context: NextPageContext) {
    return await getTheme(context);
}
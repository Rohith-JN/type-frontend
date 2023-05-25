import { useEffect, useState } from "react";
import Loader from "../components/other/Loader";
import styles from '../styles/Leaderboard.module.css'
import { useLeaderboardQuery } from "../generated/graphql";
import { useAuth } from "../firebase/auth";
import CustomError from "../components/other/Error";
import { getTheme } from "../utils/getTheme";
import { NextPageContext } from "next";

const Leaderboard = ({ themeData }: {
    themeData: {
        [key: string]: string;
    }
}) => {
    const { authUser } = useAuth();
    const uid = (authUser) ? authUser['uid'] : ''
    const [{ data, fetching }] = useLeaderboardQuery({
        variables: {
            uid: uid
        }
    })
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", themeData.theme || "");
    }, [themeData.theme]);

    useEffect(() => {
        setContentLoaded(true);
    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (contentLoaded) {
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 900);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [contentLoaded]);
    if (!data && !loading) {
        return <div>
            <CustomError statusCode={500} statusMessage={"Internal Server Error"} />
        </div>
    }
    else if (loading || fetching) {
        return <Loader />
    }
    else {
        return <>
            <div className={styles.leaderboard}>
                <p className={styles.info}>All-time Leaderboard</p>
                <div className={styles.leaderboards}>
                    <table style={{ paddingTop: "1rem" }}>
                        <thead>
                            <tr>
                                <th className={styles.rank}>Rank</th>
                                <th>User</th>
                                <th>WPM</th>
                                <th>Accuracy</th>
                                <th>Time</th>
                                <th className={styles.taken}>Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.leaderboard.leaderBoard.map((test, index) => <tr key={index}>
                                    <td className={styles.rank}>{test.rank}</td>
                                    <td>{test.user}</td>
                                    <td>{test.wpm}</td>
                                    <td>{test.accuracy}%</td>
                                    <td>1:00</td>
                                    <td className={styles.taken}>{test.testTaken}</td>
                                </tr>)
                            }
                            {(data?.leaderboard.user.rank! > 50) ? <div style={{ marginTop: "2rem" }}>
                            </div> : null}

                            {(data?.leaderboard.user.rank! > 50) ?
                                <tr style={{ backgroundColor: "var(--sub-alt-color)" }}>
                                    <td className={styles.rank}>{data?.leaderboard.user.rank}</td>
                                    <td>{data?.leaderboard.user.user}</td>
                                    <td>{data?.leaderboard.user.wpm}</td>
                                    <td>{data?.leaderboard.user.accuracy}%</td>
                                    <td>1:00</td>
                                    <td className={styles.taken}>{data?.leaderboard.user.testTaken}</td>
                                </tr>
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    }

}

export default Leaderboard

export async function getServerSideProps(context: NextPageContext) {
    return await getTheme(context);
}
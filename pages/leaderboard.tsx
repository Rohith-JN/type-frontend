import { useEffect, useMemo, useState } from "react";
import Loader from "../components/other/Loader";
import Option from '../components/other/Option';
import cookie from "cookie";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import styles from '../styles/Leaderboard.module.css'
import { useLeaderboardQuery } from "../generated/graphql";
import { secondsToTime } from "../utils/utils";
import { useAuth } from "../firebase/auth";

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
    return <>
        {loading ? (
            <Loader />
        ) : (
            <>
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
                                        <td>{test.accuracy}</td>
                                        <td>{secondsToTime(parseInt(test.time))}</td>
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
                                        <td>{data?.leaderboard.user.accuracy}</td>
                                        <td>{secondsToTime(parseInt(data?.leaderboard.user.time!))}</td>
                                        <td className={styles.taken}>{data?.leaderboard.user.testTaken}</td>
                                    </tr>
                                    : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )}
    </>
}

export default withUrqlClient(createUrqlClient)(Leaderboard)

export async function getServerSideProps(context: { req: { headers: { cookie: any; }; }; res: { writeHead: (arg0: number, arg1: { Location: string; }) => void; end: () => void; }; }) {
    const data = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)

    if (context.res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            context.res.writeHead(301, { Location: "/" })
            context.res.end()
        }
    }

    return { props: { themeData: data && data } }
}
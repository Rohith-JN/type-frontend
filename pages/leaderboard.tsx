import { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import Option from '../components/Option';
import cookie from "cookie";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import styles from '../styles/Leaderboard.module.css'
import { useLeaderboardQuery } from "../generated/graphql";
import { secondsToTime } from "../utils/utils";

const Leaderboard = ({ themeData }: {
    themeData: {
        [key: string]: string;
    }
}) => {
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
            time: option.toString()
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
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "19rem"}}>
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
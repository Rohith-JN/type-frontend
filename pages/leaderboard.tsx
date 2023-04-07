import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import cookie from "cookie";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import styles from '../styles/Leaderboard.module.css'

const Leaderboard = ({ themeData }: {
    themeData: {
        [key: string]: string;
    }
}) => {
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
                    <table style={{ paddingTop: "1rem" }}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>User</th>
                                <th>WPM</th>
                                <th>Accuracy</th>
                                <th>Time</th>
                                <th>Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>test</td>
                                <td>214</td>
                                <td>94%</td>
                                <td>1:00</td>
                                <td>21/10/22, 10:53</td>
                            </tr>
                        </tbody>
                    </table>
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
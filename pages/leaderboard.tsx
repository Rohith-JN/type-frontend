import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import cookie from "cookie";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

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
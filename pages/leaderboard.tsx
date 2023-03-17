import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Leaderboard = () => {
    const [contentLoaded, setContentLoaded] = useState(false);

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

export default Leaderboard
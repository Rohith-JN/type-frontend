import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Leaderboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 900);
    }, []);
    return <>
        {isLoading ? (
            <Loader />
        ) : (
            <>
            </>
        )}
    </>
}

export default Leaderboard
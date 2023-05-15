import { useSelector } from "react-redux";
import { calculateChartStats } from "../../utils/calculateChartStats";
import Result from "./Result"
import ResultChart from "./ResultChart"
import { State } from "../../context/reducer";
import { useEffect, useState } from "react";

const Footer = () => {
    const {
        result: { results },
    } = useSelector((state: State) => state);
    const [showResult, setShowResult] = useState(false);
    const { newTypedHistory, xAxisData, wpmData, incorrectChars } = calculateChartStats();

    useEffect(() => {
        results.length > 1 ? setShowResult(true) : setShowResult(false)
    }, [results.length])

    return (
        <div className="Footer" style={{
            marginTop: "2.5rem",
            marginBottom: "5.1rem",
            display: showResult ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box"
        }}>
            <Result />
            <div style={{
                width: "69rem",
                maxWidth: "69rem",
                height: "400px",
                marginTop: "7rem",
                paddingLeft: "20px",
                paddingRight: "20px",
            }}><ResultChart wpmData={wpmData} chartLabels={(xAxisData.length === 0) ? [1, 2] : xAxisData} typedWords={newTypedHistory} incorrectChars={incorrectChars} /></div>
        </div>
    )
}

export default Footer
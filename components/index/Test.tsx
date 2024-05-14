import { useSelector } from "react-redux";
import { State } from "../../context/state";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../../utils/test";

const Test = () => {
    const {
        time: { timer }
    } = useSelector((state: State) => state);

    return (
        <div style={{ display: "flex", width: "100", justifyContent: "center" }}>
            <div className="test">
                <div className="stats">
                    <div className="timer">{timer}</div>
                </div>

                <div style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "30px" }}>
                    <FiRefreshCcw style={{ width: "28px", height: "auto", cursor: "pointer", color: "var(--sub-color)" }} onClick={resetTest} />
                </div>
            </div>
        </div>
    );
}

export default Test
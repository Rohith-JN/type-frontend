import styles from '../styles/Footer.module.css';
import { useSelector } from "react-redux";
import { State } from "../store/reducer";

const Footer = () => {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { time },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / time / 5;
    const correctWords = result.filter((x) => x).length;
    const incorrectWords = result.filter((x) => !x).length;
    const totalWords = correctWords + incorrectWords;
    const rawWpm = 0
    const accuracy = (correctWords / totalWords) * 100 ? (correctWords / totalWords) * 100 : 0
    return (
        <div className={styles.result}>
            <table>
                <thead>
                    <tr>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Raw WPM</th>
                        <th>Words</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Math.round(wpm)}</td>
                        <td>{Math.round(accuracy)}%</td>
                        <td>{Math.round(rawWpm)}</td>
                        <td>{correctWords}{' '}/{' '}{incorrectWords}</td>
                        <td>{time}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Footer
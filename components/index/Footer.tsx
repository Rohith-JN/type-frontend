import { useSelector } from "react-redux";
import { calculateChartStats } from "../../utils/calculateChartStats";
import Result from "./Result"
import ResultChart from "./ResultChart"
import { State } from "../../context/reducer";
import { useEffect, useState } from "react";
import { calculateStats } from "../../utils/calculateStats";
import firebase from 'firebase/compat/app';
import { useCreateTestMutation } from "../../generated/graphql";
import { round } from "../../utils/utils";

const Footer = () => {
    const {
        time: { timerId, timer, testTaken },
        preferences: { time },
        result: { results },
    } = useSelector((state: State) => state);
    const [, createTest] = useCreateTestMutation();
    const [showResult, setShowResult] = useState(false);
    const { wpm, accuracy, incorrectChars, correctChars, rawWpm } = calculateStats();
    const {
        typedWordDataset,
        wordNumberLabels,
        wpmDataset,
        incorrectCharsDataset,
    } = calculateChartStats();

    useEffect(() => {
        if (!timer && timerId) {
            results.splice(1, 0, {
                wpm: wpm,
                rawWpm: rawWpm,
                accuracy: accuracy,
                correctChars: correctChars,
                incorrectChars: incorrectChars,
                time: time,
                testTaken: testTaken,
                typedWordDataset: typedWordDataset,
                wordNumberLabels: wordNumberLabels,
                wpmDataset: wpmDataset,
                incorrectCharsDataset: incorrectCharsDataset
            });
        }
    }, [timer, timerId]);

    useEffect(() => {
        async function test() {
            if (firebase.auth().currentUser && !timer && timerId) {
                await createTest({
                    chars: `${correctChars} / ${incorrectChars}`,
                    wpm: Math.round(wpm),
                    rawWpm: Math.round(rawWpm),
                    accuracy: round(accuracy, 1),
                    time: `${time}`,
                    uid: `${firebase.auth().currentUser!.uid}`,
                    testTaken: testTaken,
                    typedWordDataset: typedWordDataset,
                    wordNumberLabels: wordNumberLabels,
                    wpmDataset: wpmDataset,
                    incorrectCharsDataset: incorrectCharsDataset
                })
            }
        }
        test()
    }, [timer, timerId]);

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
            }}>
                {results.map((object, index) => {
                    if (index == 1) {
                        return (
                            <ResultChart key={index} wpmDataset={object.wpmDataset} wordNumberLables={((object.wordNumberLabels).length === 0) ? [1, 2] : object.wordNumberLabels} typedWordDataset={object.typedWordDataset} incorrectCharsDataset={object.incorrectCharsDataset} />
                        );
                    }
                    else {
                        return null
                    }
                })}
            </div>
        </div>
    )
}

export default Footer
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWordList } from "../../context/actions";
import { State } from "../../context/state";
import { FiRefreshCcw } from 'react-icons/fi';
import { resetTest } from "../../utils/test";

const Test = () => {
    const { timer } = useSelector((state: State) => state.time);
    const { wordList } = useSelector((state: State) => state.word);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const [currentWord, setCurrentWord] = useState(""); // Hold the current word
    const [typedWords, setTypedWords] = useState<string[]>([]); // Store typed words
    const [typedChars, setTypedChars] = useState<string[]>([]); // Track characters for current word

    useEffect(() => {
        import("../../public/english.json").then((words) =>
            dispatch(setWordList(words.default))
        );
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Check if spacebar was pressed
        if (inputValue.endsWith(" ")) {
            // Save the word to the list (without space) and reset the current word
            setTypedWords([...typedWords, currentWord.trim()]);
            setCurrentWord(""); // Reset the input for the next word
            setTypedChars([]);  // Reset the character comparison list
        } else {
            // Update the current word and track the typed characters
            setCurrentWord(inputValue);
            setTypedChars(inputValue.split(""));
        }
    };

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <div className="test" style={{ backgroundColor: '#1b1b1b', padding: '20px', borderRadius: '10px', width: '600px', textAlign: 'center' }}>

                {/* Text Box with styled words */}
                <div className="box">
                    <p style={{ color: '#fff', fontSize: '18px', textAlign: 'center' }}>
                        {wordList.map((word, wordIndex) => {
                            const typedWord = typedWords[wordIndex] || "";
                            const isCurrentWord = wordIndex === typedWords.length; // Check if it's the currently typed word

                            return (
                                <span key={wordIndex}>
                                    {word.split("").map((char, charIndex) => {
                                        let charColor = "#fff"; // Default color for untyped characters (white)

                                        if (wordIndex < typedWords.length) {
                                            // If the word has been typed (including partially)
                                            charColor = typedWord[charIndex] === char ? "green" : "red";
                                        } else if (isCurrentWord) {
                                            // While typing the current word
                                            const typedChar = typedChars[charIndex] || "";
                                            charColor = typedChar === char ? "green" : typedChar !== "" ? "red" : "#fff";
                                        }


                                        return (
                                            <span key={charIndex} style={{ color: charColor }}>{char}</span>
                                        );
                                    })}
                                    {'\u00A0'} {/* Add non-breaking space between words */}
                                </span>
                            );
                        })}
                    </p>
                </div>

                {/* Input box */}
                <input
                    ref={inputRef}
                    value={currentWord}
                    onChange={handleInputChange} // Handle input change
                    style={{
                        backgroundColor: '#1b1b1b',
                        border: '2px solid #007bff',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '5px',
                        width: '100%',
                        fontSize: '18px',
                        outline: 'none',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}
                />

                {/* Stats (WPM, Time, and Reset Button) */}
                <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#fff', fontSize: '16px' }}>63 WPM</div>
                    <div style={{ color: '#fff', fontSize: '16px' }}>{timer}</div>
                    <FiRefreshCcw
                        style={{ width: "28px", height: "auto", cursor: "pointer", color: "#fff" }}
                        onClick={resetTest}
                    />
                </div>
            </div>
        </div>
    );
};

export default Test;

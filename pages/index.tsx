import styles from '../styles/Home.module.css';
import { useEffect, useState, useRef } from 'react';

function NavOption(props: { optionText: string, isSelected: boolean, onClick: () => void }) {
    const { optionText, isSelected, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <h1 className={styles.NavText} style={{ color: 'var(--main-color)' }}>{optionText}</h1> : <h1 className={styles.NavText}>{optionText}</h1>}
        </div >
    );
}

export default function Home() {
    const [punctuation, setPunctuation] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [selectedOption, setSelectedOption] = useState(2);
    const inputRef = useRef<HTMLInputElement>(null);

    const options = [
        { id: 1, optionText: '15' },
        { id: 2, optionText: '30' },
        { id: 3, optionText: '60' },
        { id: 4, optionText: '120' },
        { id: 5, optionText: '300' },
    ];

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.NavBar}>
                    <h1 className={styles.NavText} onClick={() => setPunctuation(!punctuation)} style={punctuation ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>@ punctuation</h1>
                    <h1 className={styles.NavText} onClick={() => setAdvanced(!advanced)} style={advanced ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>$ advanced</h1>
                    <h1 className={styles.NavText} onClick={() => setNumbers(!numbers)} style={numbers ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}># numbers</h1>
                    <div className={styles.Divider}></div>
                    {options.map((option) => (
                        <NavOption
                            key={option.id}
                            optionText={option.optionText}
                            isSelected={option.id === selectedOption}
                            onClick={() => setSelectedOption(option.id)}
                        />
                    ))}
                </div>
                <div className={styles.TextContainer}></div>
                <div className={styles.InputContainer}>
                    <input type="search" ref={inputRef} autoComplete="off" spellCheck='false'></input>
                    <div className={styles.WPM}></div>
                    <div className={styles.Time}></div>
                    <div className={styles.Reset}></div>
                </div>
            </div>
        </>
    )
}

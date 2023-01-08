import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

function NavOption(props: { optionText: string, isSelected: boolean, onClick: () => void }) {
    const { optionText, isSelected, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <h1 className={styles.Nav_Text} style={{ color: 'var(--main-color)' }}>{optionText}</h1> : <h1 className={styles.Nav_Text}>{optionText}</h1>}
        </div >
    );
}

export default function Home() {
    const [punctuation, setPunctuation] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [selectedOption, setSelectedOption] = useState(2);
    const options = [
        { id: 1, optionText: '15' },
        { id: 2, optionText: '30' },
        { id: 3, optionText: '60' },
        { id: 4, optionText: '120' },
        { id: 5, optionText: '300' },
    ];

    return (
        <>
            <div className={styles.Nav_Container}>
                <div className={styles.NavBar}>
                    <h1 className={styles.Nav_Text} onClick={() => setPunctuation(!punctuation)} style={punctuation ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>@ punctuation</h1>
                    <h1 className={styles.Nav_Text} onClick={() => setAdvanced(!advanced)} style={advanced ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>$ advanced</h1>
                    <h1 className={styles.Nav_Text} onClick={() => setNumbers(!numbers)} style={numbers ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}># numbers</h1>
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
                <div className={styles.Input_Container}>
                </div>
            </div>
        </>
    )
}

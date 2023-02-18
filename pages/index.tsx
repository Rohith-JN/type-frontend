import styles from '../styles/Home.module.css';
import { useState, useRef } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import secondsToTime from '../components/utils/utils';

function NavOption(props: { optionText: string, isSelected: boolean, onClick: () => void }) {
  const { optionText, isSelected, onClick } = props;

  return (
    <div onClick={onClick}>
      {isSelected ? <h1 className={styles.NavText} style={{ color: 'var(--main-color)' }}>{optionText}</h1> : <h1 className={styles.NavText}>{optionText}</h1>}
    </div >
  );
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [timeSelectedOption, setTimeSelectedOption] = useState(2);
  const [wordSelectedOption, setWordSelectedOption] = useState(2);
  const [navOption, setNavOption] = useState(1);
  const [time, setTime] = useState(secondsToTime(30));
  const [words, setWords] = useState(25);

  const navOptions = [
    { id: 1, optionText: 'time' },
    { id: 2, optionText: 'words' },
    { id: 3, optionText: 'quote' },
  ]
  const timeOptions = [
    { id: 1, optionText: '15' },
    { id: 2, optionText: '30' },
    { id: 3, optionText: '60' },
    { id: 4, optionText: '120' },
  ];
  const wordOptions = [
    { id: 1, optionText: '10' },
    { id: 2, optionText: '25' },
    { id: 3, optionText: '50' },
    { id: 4, optionText: '100' },
  ];
  const navBarWidth = (navOption == 3 ? "16%" : "46%");
  const dividerVisible = (navOption == 3 ? false : true);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.NavBar} style={{ width: navBarWidth }}>
          {navOption == 1 && <>
            <h1 className={styles.NavText} onClick={() => setPunctuation(!punctuation)} style={punctuation ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>@punctuation</h1>
            <h1 className={styles.NavText} onClick={() => setNumbers(!numbers)} style={numbers ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>#numbers</h1>
          </>
          }
          {navOption == 2 && <>
            <h1 className={styles.NavText} onClick={() => setPunctuation(!punctuation)} style={punctuation ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>@punctuation</h1>
            <h1 className={styles.NavText} onClick={() => setNumbers(!numbers)} style={numbers ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>#numbers</h1>
          </>
          }
          {dividerVisible ? <div className={styles.Divider}></div> : null}

          {navOptions.map((option) => (
            <NavOption
              key={option.id}
              optionText={option.optionText}
              isSelected={option.id === navOption}
              onClick={() => {
                setNavOption(option.id);
              }}
            />
          ))}
          {dividerVisible ? <div className={styles.Divider}></div> : null}
          {navOption == 1 && timeOptions.map((option) => (
            <NavOption
              key={option.id}
              optionText={option.optionText}
              isSelected={option.id === timeSelectedOption}
              onClick={() => {
                setTimeSelectedOption(option.id);
                setTime(secondsToTime(Number(option.optionText)));
              }}
            />
          ))}
          {navOption == 2 && wordOptions.map((option) => (
            <NavOption
              key={option.id}
              optionText={option.optionText}
              isSelected={option.id === wordSelectedOption}
              onClick={() => {
                setWordSelectedOption(option.id);
                setWords(Number(option.optionText));
              }}
            />
          ))}
        </div>
        <div className={styles.TextContainer}>
          <p></p>
        </div>
        <div className={styles.InputContainer}>
          <input ref={inputRef} autoComplete="off" spellCheck='false'></input>
          <div className={styles.WPM}>
            <h1>0 <span>WPM</span></h1>
          </div>
          <div className={styles.navOption}>
            {navOption == 1 && <h1>{time}</h1>}
            {navOption == 2 && <h1>{words}</h1>}
            {navOption == 3 && <h1>quote</h1>}
          </div>
          <div className={styles.Reset}>
            <span>
              <FiRefreshCcw style={{ width: "30px", height: "auto", cursor: "pointer" }} />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
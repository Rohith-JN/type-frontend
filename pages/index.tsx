import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import NavOption from '../components/NavOption';
import { resetTest } from "../components/utils/test";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTime,
  setWordList,
  timerSet,
} from "../store/actions";
import { State } from "../store/reducer";

export default function Home() {
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2);
  const [option, setOption] = useState(30);

  const timeOptions = [
    { id: 1, optionText: 15 },
    { id: 2, optionText: 30 },
    { id: 3, optionText: 60 },
    { id: 4, optionText: 120 },
  ];

  const {
    preferences: { timeLimit },
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const time = parseInt(localStorage.getItem("time") || "60", 10);
    import(`../data/english.json`).then((words) =>
      dispatch(setWordList(words))
    );
    dispatch(timerSet(time));
    dispatch(setTime(time));
  }, [dispatch]);

  // Set Time
  useEffect(() => {
    if (timeLimit !== 0) {
      document.querySelector(".time")?.childNodes.forEach((el) => {
        if (el instanceof HTMLButtonElement)
          el.classList.remove("selected");
      });
      document
        .querySelector(`button[value="${timeLimit}"]`)
        ?.classList.add("selected");
      dispatch(setTime(timeLimit));
      localStorage.setItem("time", `${timeLimit}`);
      resetTest();
    }
  }, [dispatch, timeLimit]);

  const handleOptions = ({ target }: React.MouseEvent) => {
    if (target instanceof HTMLButtonElement && target.dataset.option) {
      if (+target.value === timeLimit) {
        target.blur();
        return;
      }
      switch (target.dataset.option) {
        case "time":
          dispatch(setTime(+target.value));
          break;
      }
      target.blur();
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.NavBar} style={{ width: "44%" }}>
          <h1 className={styles.NavText} onClick={() => setPunctuation(!punctuation)} style={punctuation ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>@punctuation</h1>
          <h1 className={styles.NavText} onClick={() => setNumbers(!numbers)} style={numbers ? { color: 'var(--main-color)' } : { color: 'var(--sub-color)' }}>#numbers</h1>
          <div className={styles.Divider}></div>
          <h1 className={styles.NavText} style={{ color: 'var(--main-color)' }}>time</h1>
          <div className={styles.Divider}></div>
          {timeOptions.map((option) => (
            <NavOption
              key={option.id}
              optionText={option.optionText}
              isSelected={option.id === selectedOption}
              onClick={() => {
                setSelectedOption(option.id);
                setOption(option.optionText);
              }}
            />
          ))}
        </div>
        <div className={styles.TextContainer}>
        </div>
        <div className={styles.InputContainer}>
          <div className={styles.WPM}>
            <h1>0 <span>WPM</span></h1>
          </div>
          <div className={styles.navOption}>
            <h1>{option}</h1>
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
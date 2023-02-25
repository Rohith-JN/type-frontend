import { Header } from '../components/Header';
import Test from '../components/Test';
import styles from '../styles/Home.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducer";
import { setTimerId } from "../store/actions";
import { recordTest } from "../utils/test";
import Footer from '../components/Footer';

const Home = () => {
  const {
    time: { timerId, timer },
    word: { currWord, typedWord, activeWordRef },
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    document.onkeydown = (e) => {
      if (
        e.key.length === 1 ||
        e.key === "Backspace" ||
        e.key === "Tab"
      ) {
        recordTest(e.key, e.ctrlKey);
        e.preventDefault();
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [dispatch]);

  useEffect(() => {
    let idx = typedWord.length - 1;
    const currWordEl = activeWordRef?.current!;
    if (currWordEl) {
      currWordEl.children[idx + 1].classList.add(
        currWord[idx] !== typedWord[idx] ? "wrong" : "right"
      );
    }
  }, [currWord, typedWord, activeWordRef]);

  useEffect(() => {
    let idx = typedWord.length;
    const currWordEl = activeWordRef?.current!;
    if (currWordEl && idx < currWord.length)
      currWordEl.children[idx + 1].classList.remove("wrong", "right");
  }, [currWord.length, typedWord, activeWordRef]);

  useEffect(() => {
    if (!timer && timerId) {
      clearInterval(timerId);
      dispatch(setTimerId(null));
    }
  }, [dispatch, timer, timerId]);

  return (
    <>
      <Header />
      <Test />
      <Footer />
    </>
  )
}

export default Home
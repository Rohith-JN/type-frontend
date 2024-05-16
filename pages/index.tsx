import Header from '../components/index/Header';
import Test from '../components/index/Test';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../context/state";
import { setTimerId } from "../context/actions";
import { recordTest } from "../utils/test";
import Footer from '../components/index/Footer';
import ConditionalRenderer from '../components/other/ConditionalRenderer';

const Home = () => {
  const { timerId, timer } = useSelector((state: State) => state.time)
  const { currWord, typedWord, activeWordRef } = useSelector((state: State) => state.word)
  const dispatch = useDispatch();

  useEffect(() => {
    document.onkeydown = (e) => {
      if (
        e.key.length === 1 ||
        e.key === "Backspace"
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

  return <ConditionalRenderer data={true} fetching={false} title={'Type'}>
    <Header />
    <Test />
    <Footer />
  </ConditionalRenderer>
}

export default Home
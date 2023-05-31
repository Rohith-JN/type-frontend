import { Header } from '../components/index/Header';
import Test from '../components/index/Test';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../context/reducer";
import { setTimerId } from "../context/actions";
import { recordTest } from "../utils/test";
import Footer from '../components/index/Footer';
import Loader from '../components/other/Loader';
import { getTheme } from '../utils/getTheme';
import { NextPageContext } from 'next';
import Head from 'next/head';

const Home = ({ themeData }: {
  themeData: {
    [key: string]: string;
  }
}) => {
  const {
    time: { timerId, timer },
    word: { currWord, typedWord, activeWordRef },
    preferences: { palette }
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData.theme || "");
  }, [themeData.theme]);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (palette) { }
      else if (
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
  }, [dispatch, palette]);

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

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setContentLoaded(true);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contentLoaded) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 900);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [contentLoaded]);

  return (
    <>
      {loading ? (
        <><Head>
          <title>Type</title>
        </Head><Loader /></>
      ) : (
        <div>
          <Head>
            <title>Type</title>
          </Head>
          <Header />
          <Test />
          <Footer />
        </div>
      )}
    </>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  return await getTheme(context);
}
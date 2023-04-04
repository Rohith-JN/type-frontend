import { Header } from '../components/Header';
import Test from '../components/Test';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducer";
import { setTimerId } from "../store/actions";
import { recordTest } from "../utils/test";
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import cookie from "cookie";
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

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
        <Loader />
      ) : (
        <>
          <Header />
          <Test />
          <Footer />
        </>
      )}
    </>
  )
}

export default withUrqlClient(createUrqlClient)(Home)

export async function getServerSideProps(context: { req: { headers: { cookie: any; }; }; res: { writeHead: (arg0: number, arg1: { Location: string; }) => void; end: () => void; }; }) {
  const data = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)

  if (context.res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      context.res.writeHead(301, { Location: "/" })
      context.res.end()
    }
  }

  return { props: { themeData: data && data } }
}
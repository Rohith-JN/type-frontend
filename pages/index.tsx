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
  const dispatch = useDispatch();

  return <ConditionalRenderer data={true} fetching={false} title={'Type'}>
    <Header />
    <Test />
    <Footer />
  </ConditionalRenderer>
}

export default Home
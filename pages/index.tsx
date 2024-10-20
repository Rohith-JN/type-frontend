import Header from '../components/index/Header';
import Test from '../components/index/Test';
import Footer from '../components/index/Footer';
import ConditionalRenderer from '../components/other/ConditionalRenderer';
import { useEffect } from 'react';
import { getTheme } from '../utils/getTheme';
import { NextPageContext } from 'next';

const Home = ({ themeData }: {
  themeData: {
    [key: string]: string;
  }
}) => {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData.theme || "");
  }, [themeData.theme]);

  return <ConditionalRenderer data={true} fetching={false} title={'Type'}>
    <Header />
    <Test />
    <Footer />
  </ConditionalRenderer>
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  return await getTheme(context);
}
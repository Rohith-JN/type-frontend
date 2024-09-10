import Header from '../components/index/Header';
import Test from '../components/index/Test';
import Footer from '../components/index/Footer';
import ConditionalRenderer from '../components/other/ConditionalRenderer';

const Home = () => {

  return <ConditionalRenderer data={true} fetching={false} title={'Type'}>
    <Header />
    <Test />
    <Footer />
  </ConditionalRenderer>
}

export default Home
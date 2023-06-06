import Login from '../components/account/Login';
import Signup from '../components/account/Signup';
import { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import Chart from '../components/account/Chart';
import { getTheme } from '../utils/getTheme';
import { NextPageContext } from 'next';
import ConditionalRenderer from '../components/other/ConditionalRenderer';
import Stats from '../components/account/Stats';
import Tests from '../components/account/Tests';
import { useAuth } from '../firebase/auth';
import { useTestsQuery, useGetStatsQuery } from '../graphql/generated/graphql';
import { usePaginatedTestsQuery } from '../hooks/usePaginatedTestsQuery';

const Account = ({ themeData }: {
  themeData: {
    [key: string]: string;
  }
}) => {
  const { authUser } = useAuth();
  const [loginVisible, setLoginVisible] = useState("flex");
  const [signupVisible, setSignUpVisible] = useState("none");
  const uid = (authUser) ? authUser['uid'] : ''
  const [{ data: testsData, fetching: testsFetching }] = useTestsQuery({ variables: { uid: uid } })
  const [{ data: userStats, fetching: userStatsFetching }] = useGetStatsQuery({ variables: { uid: uid } })
  const { paginatedTests, paginatedTestsFetching, paginatedTestsError, loadMore } = usePaginatedTestsQuery()

  const loginOnClick = () => {
    setLoginVisible("none")
    setSignUpVisible("flex")
  }
  const SignUpOnlick = () => {
    setSignUpVisible("none")
    setLoginVisible("flex")
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData.theme || "");
  }, [themeData.theme]);

  const fetching = userStatsFetching || testsFetching || paginatedTestsFetching;
  const data = testsData && userStats && !paginatedTestsError

  if (authUser) {
    return <ConditionalRenderer data={data ? true : false} fetching={fetching} title={'Type / Account'}><div className={styles.account}>
      <Stats data={userStats!} />
      <Chart data={testsData!} />
      <Tests data={paginatedTests} callBack={loadMore} />
    </div></ConditionalRenderer >
  }
  else {
    return <ConditionalRenderer data={true} fetching={false} title={'Type / Account'}>
      <div style={{ display: "flex", width: "100%", justifyContent: "center", height: "80vh", alignItems: "center" }}>
        <div style={{ display: loginVisible }}>
          <Login onClick={loginOnClick} />
        </div>
        <div style={{ display: signupVisible }}>
          <Signup onClick={SignUpOnlick} />
        </div>
      </div>
    </ConditionalRenderer>
  }
};

export default Account;

export async function getServerSideProps(context: NextPageContext) {
  return await getTheme(context);
}

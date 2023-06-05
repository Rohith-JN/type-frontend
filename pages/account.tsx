import { useAuth } from '../firebase/auth';
import Login from '../components/account/Login';
import Signup from '../components/account/Signup';
import { useEffect, useState } from 'react';
import { useGetStatsQuery, useTestsQuery } from '../generated/graphql';
import { secondsToTime } from '../utils/utils';
import styles from '../styles/Account.module.css';
import AccountChart from '../components/account/AccountChart';
import { getTheme } from '../utils/getTheme';
import { NextPageContext } from 'next';
import ConditionalRenderer from '../components/other/ConditionalRenderer';
import { usePaginatedTestsQuery } from '../hooks/usePaginatedTestsQuery';

const Account = ({ themeData }: {
  themeData: {
    [key: string]: string;
  }
}) => {
  const { authUser } = useAuth();
  const uid = (authUser) ? authUser['uid'] : ''
  const [loginVisible, setLoginVisible] = useState("flex");
  const [signupVisible, setSignUpVisible] = useState("none");
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
    return <ConditionalRenderer data={data ? true : false} fetching={fetching} title={'Type / Account'}>
      <div className={styles.account}>
        <div className={styles.stats}>
          <p style={{ fontFamily: 'lexend', fontWeight: "light", color: "var(--sub-color)", fontSize: "13px" }}>All Time Average / Past 10 Average</p>
          <table>
            <thead>
              <tr>
                <th className={styles.sno}>S:No</th>
                <th className={styles.time}>Time</th>
                <th className={styles.pb}>PB</th>
                <th className={styles.wpm}>WPM</th>
                <th className={styles.acc}>Accuracy</th>
                <th className={styles.testsTaken}>Tests taken</th>
              </tr>
            </thead>
            <tbody>
              {
                userStats?.getStats.userStats.map((stat, index) => <tr key={index + 1}>
                  <td className={styles.sno}>{index + 1}</td>
                  <td className={styles.time}>{secondsToTime(parseInt(stat.time))}</td>
                  <td className={styles.pb}>{stat.pb}</td>
                  <td className={styles.wpm}>
                    {stat.wpm.toString()} / {stat.recentWpm.toString()}</td>
                  <td className={styles.acc}>
                    {stat.accuracy.toString()} / {stat.recentAccuracy.toString()}</td>
                  <td className={styles.testsTaken}>{stat.testsTaken}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        {(authUser) ? <div className={styles.graph}><AccountChart wpmData={(testsData?.tests.wpmData!.length! > 0 ? testsData?.tests.wpmData! : [])} accuracyData={(testsData?.tests.accuracyData!.length! > 0) ? testsData?.tests.accuracyData! : []} chartLabels={(testsData?.tests.labels!.length! > 1) ? testsData?.tests.labels! : [1, 2]} takenData={testsData?.tests.testTaken!} /></div> : null}
        {(paginatedTests.length != 0) ? <div className={styles.tests}>
          <table>
            <thead>
              <tr>
                <th className={styles.sno}>S:No</th>
                <th className={styles.wpm}>WPM</th>
                <th className={styles.raw}>Raw</th>
                <th className={styles.acc}>Accuracy</th>
                <th className={styles.chars}>Chars</th>
                <th className={styles.time}>Time</th>
                <th className={styles.taken}>Taken</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedTests.map((test: any, index: number) => <tr key={index + 1}>
                  <td className={styles.sno}>{index + 1}</td>
                  <td className={styles.wpm}>{test.wpm}</td>
                  <td className={styles.raw}>{test.rawWpm}</td>
                  <td className={styles.acc}>{test.accuracy}%</td>
                  <td className={styles.chars}>{test.chars}</td>
                  <td className={styles.time}>{secondsToTime(parseInt(test.time))}</td>
                  <td className={styles.taken}>{test.testTaken}</td>
                </tr>)
              }
            </tbody>
          </table>
          <button onClick={loadMore} disabled={paginatedTests.length % 10 !== 0}>
            {paginatedTests.length % 10 === 0 ? "Load more" : "No more tests"}
          </button>
        </div> : null}
      </div>
    </ConditionalRenderer>
  }
  else {
    return <ConditionalRenderer data={true} fetching={false} title={'Type / Account'}>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
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

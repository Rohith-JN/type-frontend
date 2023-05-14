import { useAuth } from '../firebase/auth';
import Login from '../components/account/Login';
import Signup from '../components/account/Signup';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/other/Loader';
import { useGetStatsQuery, useTestsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { secondsToTime } from '../utils/utils';
import styles from '../styles/Account.module.css';
import CustomError from '../components/other/Error';
import Chart from '../components/account/Chart';
import firebase from 'firebase/compat/app';
import { gql, useClient } from 'urql';
import { getTheme } from '../utils/getTheme';
import { NextPageContext } from 'next';

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

  const paginatedTestQuery = gql`
  query paginatedTests($uid: String!, $first: Int!, $after: String) {
    paginatedTests(uid: $uid, first: $first, after: $after) {
      tests {
        time
        accuracy
        wpm
        words
        createdAt
        testTaken
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

  const [tests, setTests] = useState<any[]>([]);
  const [paginatedTestsError, setpaginatedTestsError] = useState<boolean>(false);
  const [paginatedTestsFetching, setpaginatedTestsFetching] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const graphqlClient = useClient();
  const handleLoadMore = useCallback(() => {
    if (!endCursor) {
      return;
    }
    graphqlClient
      .query(paginatedTestQuery, { uid, first: 10, after: endCursor })
      .toPromise()
      .then((nextResult) => {
        setpaginatedTestsFetching(true)
        const { tests: newTests, pageInfo } = nextResult.data.paginatedTests;
        setTests((oldTests) => [...oldTests, ...newTests]);
        setEndCursor(pageInfo.endCursor);
        setpaginatedTestsFetching(false)
        setpaginatedTestsError(false)
      }).catch((_) => {
        setpaginatedTestsFetching(false)
        setpaginatedTestsError(true)
      });
  }, [endCursor, graphqlClient, paginatedTestQuery, uid]);

  useEffect(() => {
    graphqlClient
      .query(paginatedTestQuery, { uid, first: 10 })
      .toPromise()
      .then((result) => {
        setpaginatedTestsFetching(true)
        const { tests: newTests, pageInfo } = result.data.paginatedTests;
        setTests(newTests);
        setEndCursor(pageInfo.endCursor);
        setpaginatedTestsFetching(false)
        setpaginatedTestsError(false)
      }).catch((_) => {
        setpaginatedTestsFetching(false)
        setpaginatedTestsError(true)
      });;
  }, [graphqlClient, paginatedTestQuery, uid]);

  const loginOnClick = () => {
    setLoginVisible("none")
    setSignUpVisible("flex")
  }
  const SignUpOnlick = () => {
    setSignUpVisible("none")
    setLoginVisible("flex")
  }

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData.theme || "");
  }, [themeData.theme]);

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

  if (authUser) {
    if (loading || userStatsFetching || testsFetching || paginatedTestsFetching) {
      return <Loader />
    }
    if ((!testsData || !userStats || paginatedTestsError) && !loading) {
      return <div>
        <CustomError statusCode={null} statusMessage={'Oops something went wrong!'} />
      </div>
    }
    else {
      const userCreationDate = new Date(firebase.auth().currentUser!.metadata.creationTime!).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return (
        <div className={styles.account}>
          <p className={styles.info}>Account created on {userCreationDate.toString()}</p>
          <div className={styles.stats}>
            <p style={{ fontFamily: 'lexend', fontWeight: "light", color: "var(--sub-color)", fontSize: "13px" }}>All Time Average / Past 10 Average</p>
            <table>
              <thead>
                <tr>
                  <th className={styles.sno}>S:No</th>
                  <th>Time</th>
                  <th>PB</th>
                  <th>WPM</th>
                  <th>Accuracy</th>
                  <th className={styles.testsTaken}>Tests taken</th>
                </tr>
              </thead>
              <tbody>
                {
                  userStats?.getStats.userStats.map((stat, index) => <tr key={index + 1}>
                    <td className={styles.sno}>{index + 1}</td>
                    <td>{secondsToTime(parseInt(stat.time))}</td>
                    <td>{stat.pb}</td>
                    <td>
                      {stat.wpm.toString()} / {stat.recentWpm.toString()}</td>
                    <td>
                      {stat.accuracy.toString()} / {stat.recentAccuracy.toString()}</td>
                    <td className={styles.testsTaken}>{stat.testsTaken}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
          {(authUser) ? <div className={styles.graph}><Chart wpmData={(testsData?.tests.wpmData!.length! > 0 ? testsData?.tests.wpmData! : [])} accuracyData={(testsData?.tests.accuracyData!.length! > 0) ? testsData?.tests.accuracyData! : []} chartLabels={(testsData?.tests.labels!.length! > 1) ? testsData?.tests.labels! : [1, 2]} takenData={testsData?.tests.testTaken!} /></div> : null}
          {(tests.length != 0) ? <div className={styles.tests}>
            <table>
              <thead>
                <tr>
                  <th className={styles.sno}>S:No</th>
                  <th>WPM</th>
                  <th>Accuracy</th>
                  <th>Words</th>
                  <th>Time</th>
                  <th className={styles.taken}>Taken</th>
                </tr>
              </thead>
              <tbody>
                {
                  tests.map((test: any, index: number) => <tr key={index + 1}>
                    <td className={styles.sno}>{index + 1}</td>
                    <td>{test.wpm}</td>
                    <td>{test.accuracy}%</td>
                    <td>{test.words}</td>
                    <td>{secondsToTime(parseInt(test.time))}</td>
                    <td className={styles.taken}>{test.testTaken}</td>
                  </tr>)
                }
              </tbody>
            </table>
            <button onClick={handleLoadMore} disabled={tests.length % 10 !== 0}>
              {tests.length % 10 === 0 ? "Load more" : "No more tests"}
            </button>
          </div> : null}
        </div>
      )
    }
  }
  else {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <div style={{ display: loginVisible }}>
                <Login onClick={loginOnClick} />
              </div>
              <div style={{ display: signupVisible }}>
                <Signup onClick={SignUpOnlick} />
              </div>
            </div>
          </>
        )}
      </>)
  }
};

export default withUrqlClient(createUrqlClient)(Account);

export async function getServerSideProps(context: NextPageContext) {
  return await getTheme(context);
}

import { useAuth } from '../firebase/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import cookie from "cookie";
import { useGetStatsQuery, useTestsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { secondsToTime } from '../utils/utils';
import styles from '../styles/Account.module.css';
import CustomError from '../components/Error';
import Chart from '../components/Chart';
import firebase from 'firebase/compat/app';
import { gql, useClient } from 'urql';

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
        chars
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
        const { tests: newTests, pageInfo } = nextResult.data.paginatedTests;
        setTests((oldTests) => [...oldTests, ...newTests]);
        setEndCursor(pageInfo.endCursor);
      });
  }, [endCursor, graphqlClient, paginatedTestQuery, uid]);

  useEffect(() => {
    graphqlClient
      .query(paginatedTestQuery, { uid, first: 10 })
      .toPromise()
      .then((result) => {
        const { tests: newTests, pageInfo } = result.data.paginatedTests;
        setTests(newTests);
        setEndCursor(pageInfo.endCursor);
      });
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
    if (loading) {
      return <Loader />
    }
    if (!testsFetching && !userStatsFetching && !testsData && !userStats && !loading) {
      return <div>
        <CustomError statusCode={null} statusMessage={'Oops something went wrong'} />
      </div>
    }
    else {
      const userCreationDate = new Date(firebase.auth().currentUser!.metadata.creationTime!).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return (
        <>
          {!testsData && !userStats && testsFetching && userStatsFetching || loading ? (
            <Loader />
          ) : (
            <div className={styles.account}>
              <p className={styles.info}>Account created on {userCreationDate.toString()}</p>
              <div className={styles.stats}>
                <p style={{ fontFamily: 'lexend', fontWeight: "light", color: "var(--sub-color)", fontSize: "13px" }}>All Time Average / Past 10 Average</p>
                <table>
                  <thead>
                    <tr>
                      <th>S:No</th>
                      <th>Time</th>
                      <th>PB</th>
                      <th>WPM</th>
                      <th>Accuracy</th>
                      <th>Tests taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userStats?.getStats.userStats.map((stat, index) => <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{secondsToTime(parseInt(stat.time))}</td>
                        <td>{stat.pb}</td>
                        <td>
                          {stat.wpm.toString()} / {stat.recentWpm.toString()}</td>
                        <td>
                          {stat.accuracy.toString()} / {stat.recentAccuracy.toString()}</td>
                        <td>{stat.testsTaken}</td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
              {(authUser) ? <div style={{ width: "68rem", maxWidth: "68rem", height: "400px", marginBottom: "7rem", marginTop: "7rem" }}><Chart wpmData={(testsData?.tests.wpmData!.length! > 0 ? testsData?.tests.wpmData! : [])} accuracyData={(testsData?.tests.accuracyData!.length! > 0) ? testsData?.tests.accuracyData! : []} chartLabels={(testsData?.tests.labels!.length! > 1) ? testsData?.tests.labels! : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} takenData={testsData?.tests.testTaken!} /></div> : null}
              {(tests.length != 0) ? <div className={styles.tests}>
                <table>
                  <thead>
                    <tr>
                      <th>S:No</th>
                      <th>WPM</th>
                      <th>Accuracy</th>
                      <th>Words</th>
                      <th>Time</th>
                      <th>Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tests.map((test: any, index: number) => <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{test.wpm}</td>
                        <td>{test.accuracy}</td>
                        <td>{test.chars}</td>
                        <td>{secondsToTime(parseInt(test.time))}</td>
                        <td>{test.testTaken}</td>
                      </tr>)
                    }
                  </tbody>
                </table>
                <button onClick={handleLoadMore} disabled={tests.length % 10 !== 0}>
                  {tests.length % 10 === 0 ? "Load more" : "No more tests"}
                </button>
              </div> : null}
            </div>
          )}
        </>
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
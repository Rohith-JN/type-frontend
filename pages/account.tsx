import { useAuth } from '../firebase/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import firebase from 'firebase/compat/app';
import cookie from "cookie";
import { useTestsQuery, useUserQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { formatDate, secondsToTime } from '../utils/utils';
import styles from '../styles/Account.module.css';
import CustomError from '../components/Error';

const Account = ({ themeData }: {
  themeData: {
    [key: string]: string;
  }
}) => {
  const { authUser } = useAuth();
  const [loginVisible, setLoginVisible] = useState("flex");
  const [signupVisible, setSignUpVisible] = useState("none");
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  });
  const [{ data: userData, fetching: userFetching }] = useUserQuery({
    variables: {
      uid: (firebase.auth().currentUser) ? firebase.auth().currentUser!.uid : ''
    }
  })
  const [{ data: testsData, fetching: testsFetching }] = useTestsQuery({
    variables: {
      uid: (firebase.auth().currentUser) ? firebase.auth().currentUser!.uid : '',
      limit: variables.limit,
      cursor: variables.cursor
    }
  })

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
    if (!userFetching && !testsFetching && !testsData && !userData && !loading) {
      return <div>
        <CustomError statusCode={null} statusMessage={'Oops something went wrong'} />
      </div>
    }
    else {
      return (
        <>
          {!userData && !testsData && userData && testsFetching || loading ? (
            <Loader />
          ) : (
            <div className={styles.account}>
              <p className={styles.info}>Account created on {formatDate(parseInt(userData?.user.user?.createdAt!))}</p>
              <table style={{ paddingTop: "1rem" }}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>PB</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Tests taken</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0:15</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0 / 0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>0:30</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0 / 0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>1:00</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0 / 0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>2:00</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0 / 0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
              <table style={{ paddingTop: "4rem" }}>
                <thead>
                  <tr>
                    <th>S:No</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Words</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    testsData?.tests.tests.map((test, index) => <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{test.wpm}</td>
                      <td>{test.accuracy}</td>
                      <td>{test.chars}</td>
                      <td>{secondsToTime(parseInt(test.time))}</td>
                    </tr>)
                  }
                </tbody>
              </table>
              {testsData && testsData.tests.hasMore ? <button>Load more</button> : null}
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
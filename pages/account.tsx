import { useAuth } from '../firebase/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import firebase from 'firebase/compat/app';
import cookie from "cookie";
import { useTestsQuery, useUserMutation } from '../generated/graphql';
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
  const [, user] = useUserMutation();
  const [{ data, fetching, error }] = useTestsQuery({
    variables: {
      uid: (firebase.auth().currentUser) ? firebase.auth().currentUser!.uid : '',
      limit: 10
    }
  })
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    uid: '',
    id: 0,
    createdAt: 0
  });

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
    async function getUser() {
      if (authUser && firebase.auth().currentUser) {
        const response = await user({ uid: firebase.auth().currentUser!.uid })
        setUserData({
          username: response.data?.user.user?.username!,
          email: response.data?.user.user?.email!,
          uid: response.data?.user.user?.uid!,
          id: response.data?.user.user?.id!,
          createdAt: parseInt(response.data?.user.user?.createdAt!)
        });
      }
    }
    getUser()
  }, [authUser, user])

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
    if (!fetching && !data && !loading) {
      return <div>
        <CustomError statusCode={null} statusMessage={'Oops something went wrong'} />
      </div>
    }
    else {
      return (
        <>
          {!data && fetching || loading ? (
            <Loader />
          ) : (
            <div className={styles.account}>
              <p className={styles.info}>Account created on {formatDate(userData.createdAt)}</p>
              <table>
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
                    data?.tests.map((test, index) => <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{test.wpm}</td>
                      <td>{test.accuracy}</td>
                      <td>{test.chars}</td>
                      <td>{secondsToTime(parseInt(test.time))}</td>
                    </tr>)
                  }
                </tbody>
              </table>
              {data ? <button>Load more</button> : null}
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
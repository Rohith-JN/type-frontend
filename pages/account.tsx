import { useAuth } from '../firebase/auth';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useState } from 'react';

const Account = () => {
  const { authUser } = useAuth();
  const [loginVisible, setLoginVisible] = useState("flex")
  const [signupVisible, setSignUpVisible] = useState("none")
  const loginOnClick = () => {
    setLoginVisible("none")
    setSignUpVisible("flex")
  }
  const SignUpOnlick = () => {
    setSignUpVisible("none")
    setLoginVisible("flex")
  }
  if (authUser) {
    return (
      <></>
    );
  }
  else {
    return <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div style={{ display: loginVisible }}>
        <Login onClick={loginOnClick} />
      </div>
      <div style={{ display: signupVisible }}>
        <Signup onClick={SignUpOnlick} />
      </div>
    </div>
  }
};

export default Account;

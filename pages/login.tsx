import React from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router'
import { NextPage } from 'next';

const Login: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <div className={styles.Login}>
                <h1>Log In</h1>
                <form role='form'>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' ></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password'></input>
                    <button type="submit" value="Submit" className={styles.slide}>Log in</button>
                </form>
                <p>Don&apos;t have an account? <span onClick={() => router.push("/signup")}>Sign Up</span></p>
            </div>
        </>
    );
}

export default Login
import React from 'react';
import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router'
import { NextPage } from 'next';

const Signup: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <div className={styles.Signup}>
                <h1>Sign Up</h1>
                <form role='form'>
                    <input autoComplete="off" spellCheck='false' type="text" placeholder='Name'></input>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' ></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password'></input>
                    <button type="submit" value="Submit" className={styles.slide}>Sign up</button>
                </form>
                <p>Already have an account? <span onClick={() => router.push("/login")}>Log In</span></p>
            </div>
        </>
    );
}

export default Signup
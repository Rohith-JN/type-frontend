import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { NextPage } from 'next';

const Signup: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <>
            <div className={styles.Signup}>
                <h1>Sign Up</h1>
                <form role='form'>
                    <input autoComplete="off" spellCheck='false' type="text" placeholder='Name'></input>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' value={email}
                        onChange={(event) => setEmail(event.target.value)}></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password' value={password}
                        onChange={(event) => setPassword(event.target.value)}></input>
                    <button type="submit" value="Submit" className={styles.slide}>Sign up</button>
                </form>
                <p>Already have an account? <span onClick={() => router.push("/login")}>Log In</span></p>
            </div>
        </>
    );
}

export default Signup
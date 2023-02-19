import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        await firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            router.push('/account');
        }).catch(function (error) {
            const message = error.message;
            toast(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    return (
        <>
            <div className={styles.Login}>
                <h1>Log In</h1>
                <form role='form' onSubmit={onSubmit}>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' value={email}
                        onChange={(event) => setEmail(event.target.value)} required></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password' value={password}
                        onChange={(event) => setPassword(event.target.value)} required></input>
                    <button type="submit" value="Submit" className={styles.slide}>Log in</button>
                </form>
                <p>Don&apos;t have an account? <span onClick={() => router.push("/signup")}>Sign Up</span></p>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="dark"
            />
        </>
    );
}

export default Login
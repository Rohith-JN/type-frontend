import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { NextPage } from 'next';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(email, password)
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
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
            <div className={styles.Signup}>
                <h1>Sign Up</h1>
                <form role='form' onSubmit={onSubmit}>
                    <input autoComplete="off" spellCheck='false' type="text" placeholder='Name' required></input>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' value={email}
                        onChange={(event) => setEmail(event.target.value)} required></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password' value={password}
                        onChange={(event) => setPassword(event.target.value)} required></input>
                    <button type="submit" value="Submit" className={styles.slide}>Sign up</button>
                </form>
                <p>Already have an account? <span onClick={() => router.push("/login")}>Log In</span></p>
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

export default Signup
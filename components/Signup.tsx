import styles from '../styles/Signup.module.css';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup(props: { onClick: VoidFunction }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        }).catch(function (error) {
            const message = error.message;
            toast.error(message, {
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
                <p>Already have an account? <span onClick={props.onClick}>Log In</span></p>
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
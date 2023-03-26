import styles from '../styles/Signup.module.css';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'urql';

const REGISTER_MUT = `
    mutation Register($username: String!, $email: String!, $password: String!, $uid: String! ) {
        register(options: { username: $username, email: $email, password: $password, uid: $uid }) {
            error {
                field
                message
            }
            user {
                id
                uid
                username
                email
            }
        }
    }
`

export default function Signup(props: { onClick: VoidFunction }) {
    const [, register] = useMutation(REGISTER_MUT);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function () {
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
        if (firebase.auth().currentUser !== null) {
            const uid = firebase.auth().currentUser!.uid
            await register({ username: user.username, email: user.email, password: user.password, uid: uid });
        }
    }

    return (
        <>
            <div className={styles.Signup}>
                <h1>Sign Up</h1>
                <form role='form' onSubmit={onSubmit}>
                    <input autoComplete="off" spellCheck='false' type="text" placeholder='Name' required onChange={(event) => setUser({ ...user, username: event.target.value })} value={user.username}></input>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' value={user.email}
                        onChange={(event) => setUser({ ...user, email: event.target.value })} required></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password' value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value })} required></input>
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
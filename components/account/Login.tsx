import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../../utils/customToast';
import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '../../context/actions';
import { useAuth } from '../../firebase/auth';
import { State } from '../../context/state';
import { customToast } from '../../utils/customToast';

export default function Login(props: { onClick: VoidFunction }) {
    const {
        result: { results }
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const { signInWithEmailAndPassword } = useAuth()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        await signInWithEmailAndPassword(user.email, user.password).then(function () {
            dispatch(setResult([results[0]]));
            customToast.success("Logged in!", toastOptions)
        }).catch(function (error) {
            const message = error.message.replace("Firebase:", "");
            customToast.error(message.replace(/\([^)]*\)\.?/g, ""), toastOptions);
        })
    }

    return (
        <>
            <div className={styles.Login}>
                <h1>Log In</h1>
                <form role='form' onSubmit={onSubmit}>
                    <input autoComplete="off" spellCheck='false' type="email" placeholder='Email' value={user.email}
                        onChange={(event) => setUser({ ...user, email: event.target.value })} required></input>
                    <input autoComplete="off" spellCheck='false' type="password" placeholder='Password' value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value })} required></input>
                    <button type="submit" value="Submit" className={styles.slide}>Log in</button>
                </form>
                <p>Don&apos;t have an account? <span onClick={props.onClick}>Sign Up</span></p>
            </div>
        </>
    );
}
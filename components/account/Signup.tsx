import styles from '../../styles/Signup.module.css';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'react-toastify/dist/ReactToastify.css';
import { useRegisterMutation, useValidateMutation } from '../../graphql/generated/graphql';
import { toastOptions } from '../../utils/customToast';
import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '../../context/actions';
import { State } from '../../context/state';
import { customToast } from '../../utils/customToast';
import { useAuth } from '../../firebase/auth';

const Signup = (props: { onClick: VoidFunction }) => {
    const {
        result: { results }
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [, register] = useRegisterMutation();
    const [, validate] = useValidateMutation();
    const { createUserWithEmailAndPassword } = useAuth()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const validation = await validate({
            username: user.username,
            email: user.email,
            password: user.password
        });

        if (validation.data?.validate.field === null && validation.data?.validate.message === null) {
            await createUserWithEmailAndPassword(user.email, user.password).then(function () {
                dispatch(setResult([results[0]]));
                customToast.success("Signed Up!", toastOptions)
            }).catch(function (error) {
                const message = error.message.replace("Firebase:", "");
                customToast.error(message.replace(/\([^)]*\)\.?/g, ""), toastOptions);
            })
            if (firebase.auth().currentUser) {
                const uid = firebase.auth().currentUser!.uid
                await register({ username: user.username, email: user.email, uid: uid });
            }
        }
        else {
            customToast.error(validation.data?.validate.message!, toastOptions);
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
        </>
    );
}

export default Signup
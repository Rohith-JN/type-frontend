import styles from '../../styles/Signup.module.css';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRegisterMutation, useValidateMutation } from '../../generated/graphql';
import { toastOptions } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '../../store/actions';
import { State } from '../../store/reducer';

const Signup = (props: { onClick: VoidFunction }) => {
    const {
        result: { results }
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [, register] = useRegisterMutation();
    const [, validate] = useValidateMutation();
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
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function () {
                dispatch(setResult([results[0]]));
                toast.success("Signed Up!", toastOptions)
            }).catch(function (error) {
                const message = error.message.replace("Firebase:", "");
                toast.error(message.replace(/\([^)]*\)\.?/g, ""), toastOptions);
            })
            if (firebase.auth().currentUser !== null) {
                const uid = firebase.auth().currentUser!.uid
                await register({ username: user.username, email: user.email, password: user.password, uid: uid });
            }
        }
        else {
            toast.error(validation.data?.validate.message, toastOptions);
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
                position="top-right"
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
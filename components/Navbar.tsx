import styles from '../styles/Navbar.module.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md'
import { useAuth } from '../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../utils/utils';
import { State } from '../store/reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/actions';

function NavOption(props: { optionText: string, isSelected: boolean, route: string, onClick: () => void }) {
    const { optionText, isSelected, route, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <Link style={{ color: 'var(--main-color)' }} className={styles.Nav_Text} href={route}>{optionText}</Link> : <Link className={styles.Nav_Text} href={route}>{optionText}</Link>}
        </div>
    );
}

const Navbar = () => {
    const {
        result: { results }
    } = useSelector((state: State) => state);
    const dispatch = useDispatch()
    const { asPath } = useRouter();
    const { authUser, signOut } = useAuth()
    const options = useMemo(() => [
        { id: 1, optionText: 'type', route: '/' },
        { id: 2, optionText: 'account', route: '/account' },
        { id: 3, optionText: 'leaderboard', route: '/leaderboard' },
    ], []);
    let currentId = 1;
    options.map((option) => {
        if (option.route === asPath) {
            currentId = option.id
        }
    })
    const [selectedOption, setSelectedOption] = useState(currentId);

    useEffect(() => {
        let currentId = 1;
        options.forEach((option) => {
            if (option.route === asPath) {
                currentId = option.id;
            }
        });
        setSelectedOption(currentId);
    }, [asPath, options]);

    return (
        <div className={styles.Navbar}>
            <div className={styles.Nav_Container}>
                <div className={styles.Nav}>
                    <h1 className={styles.heading}>Type<span>.io</span></h1>
                    <div className={styles.Nav_Items}>
                        {options.map((option) => (
                            <NavOption
                                key={option.id}
                                optionText={option.optionText}
                                route={option.route}
                                isSelected={option.id === selectedOption}
                                onClick={() => setSelectedOption(option.id)}
                            />
                        ))}
                        {(authUser) ? <MdLogout size={20} color='var(--main-color)' style={{ cursor: "pointer" }} onClick={async () => {

                            await signOut().then(() => {
                                toast.success("Signed Out!", toastOptions);
                                dispatch(setResult([results[0]]));
                            })
                        }} /> : null}
                    </div>
                </div>
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
        </div>
    );
};

export default Navbar;

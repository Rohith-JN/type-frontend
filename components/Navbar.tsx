import styles from '../styles/Navbar.module.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md'
import firebase from 'firebase/compat/app'
import { useAuth } from '../firebase/auth';

function NavOption(props: { optionText: string, isSelected: boolean, route: string, onClick: () => void }) {
    const { optionText, isSelected, route, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <Link style={{ color: 'var(--main-color)' }} className={styles.Nav_Text} href={route}>{optionText}</Link> : <Link className={styles.Nav_Text} href={route}>{optionText}</Link>}
        </div>
    );
}

const Navbar = () => {
    const { asPath } = useRouter();
    const router = useRouter();
    const { authUser } = useAuth()
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
                        {(authUser) ? <MdLogout size={20} color='var(--main-color)' style={{ cursor: "pointer" }} onClick={() => {
                            firebase.auth().signOut()
                            window.location.reload()
                        }} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

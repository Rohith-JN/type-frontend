import styles from '../../styles/Navbar.module.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md'
import { useAuth } from '../../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../../utils/utils';
import { State } from '../../store/reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setResult } from '../../store/actions';
import { MdLeaderboard } from 'react-icons/md';
import { BsKeyboardFill } from 'react-icons/bs';
import { RiAccountCircleFill } from 'react-icons/ri';

function NavOption(props: { option: any, isSelected: boolean, route: string, onClick: () => void }) {
    const { option, isSelected, route, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <Link style={{ color: 'var(--main-color)' }} className={styles.NavText} href={route}>{option}</Link> : <Link className={styles.NavText} href={route}>{option}</Link>}
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
        { id: 1, optionText: 'type', route: '/', optionIcon: <BsKeyboardFill size={25} /> },
        { id: 2, optionText: 'account', route: '/account', optionIcon: <RiAccountCircleFill size={25} /> },
        { id: 3, optionText: 'leaderboard', route: '/leaderboard', optionIcon: <MdLeaderboard size={25} /> },
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
            <div className={styles.NavContainer}>
                <div className={styles.Nav}>
                    <h1 className={styles.heading}>Type<span>.io</span></h1>
                    <div className={styles.NavItems}>
                        <div className={styles.NavOptions} style={{ width: (authUser) ? "22rem" : "17rem", maxWidth: (authUser) ? "22rem" : "17rem" }}>
                            {options.map((option) => (
                                <NavOption
                                    key={option.id}
                                    option={option.optionText}
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
                        <div className={styles.IconOptions} style={{ width: (authUser) ? "10rem" : "5rem", maxWidth: (authUser) ? "15rem" : "10rem" }}>
                            {options.map((option) => (
                                <NavOption
                                    key={option.id}
                                    option={option.optionIcon}
                                    route={option.route}
                                    isSelected={option.id === selectedOption}
                                    onClick={() => setSelectedOption(option.id)}
                                />
                            ))}
                            {(authUser) ? <MdLogout size={20} color='var(--main-color)' style={{ cursor: "pointer", marginBottom: "0.4rem" }} onClick={async () => {
                                await signOut().then(() => {
                                    toast.success("Signed Out!", toastOptions);
                                    dispatch(setResult([results[0]]));
                                })
                            }} /> : null}
                        </div>

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

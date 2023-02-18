import styles from '../styles/Navbar.module.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

function NavOption(props: { optionText: string, isSelected: boolean, route: string, onClick: () => void }) {
    const { optionText, isSelected, route, onClick } = props;
    const router = useRouter();

    function handleClick() {
        router.push(route);
        onClick();
    }

    return (
        <div onClick={handleClick}>
            {isSelected ? <h1 style={{ color: 'var(--main-color)' }} className={styles.Nav_Text}>{optionText}</h1> : <h1 className={styles.Nav_Text}>{optionText}</h1>}
        </div>
    );
}

const Navbar = () => {
    const { asPath } = useRouter();
    const options = useMemo(() => [
        { id: 1, optionText: 'type', route: '/' },
        { id: 2, optionText: 'log-in', route: '/login' },
        { id: 3, optionText: 'sign-up', route: '/signup' },
        { id: 4, optionText: 'leaderboard', route: '/leaderboard' },
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
                    <h1 className={styles.heading}>Type</h1>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import styles from '../styles/Navbar.module.css';
import React, { useState } from 'react';
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
    const [selectedOption, setSelectedOption] = useState(1);
    const options = [
        { id: 1, optionText: 'type', route: '/' },
        { id: 2, optionText: 'account', route: '/account' },
        { id: 3, optionText: 'leaderboard', route: '/leaderboard' },
    ];

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
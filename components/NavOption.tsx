import styles from '../styles/Header.module.css';

export default function NavOption(props: { optionText: number, isSelected: boolean, onClick: () => void }) {
    const { optionText, isSelected, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <h1 className={styles.NavText} style={{ color: 'var(--main-color)' }}>{optionText}</h1> : <h1 className={styles.NavText}>{optionText}</h1>}
        </div >
    );
}
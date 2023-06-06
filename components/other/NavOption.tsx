import Link from "next/link";
import styles from "../../styles/Navbar.module.css"

const NavOption = (props: { option: any, isSelected: boolean, route: string, onClick: () => void }) => {
    const { option, isSelected, route, onClick } = props;

    return (
        <div onClick={onClick}>
            {isSelected ? <Link style={{ color: 'var(--main-color)' }} className={styles.NavText} href={route}>{option}</Link> : <Link className={styles.NavText} href={route}>{option}</Link>}
        </div>
    );
}

export default NavOption

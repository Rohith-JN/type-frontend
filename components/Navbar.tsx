import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.Nav_Container}>
        <div className={styles.Nav}>
          <h1 className={styles.heading}>Type</h1>
          <div className={styles.Nav_Items}>
            <h1 className={styles.Nav_Text}>type</h1>
            <h1 className={styles.Nav_Text}>account</h1>  
            <h1 className={styles.Nav_Text}>leaderboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.Nav_Container}>
        <div className={styles.NavBar}>
          <h1 className={styles.Nav_Text}>@punctuation</h1>
          <h1 className={styles.Nav_Text}>#numbers</h1>
          <div className={styles.Divider}></div>
          <h1 className={styles.Nav_Text}>time</h1>
          <h1 className={styles.Nav_Text}>quote</h1>
          <h1 className={styles.Nav_Text}>words</h1>
          <div className={styles.Divider}></div>
          <h1 className={styles.Nav_Text}>15</h1>
          <h1 className={styles.Nav_Text}>30</h1>
          <h1 className={styles.Nav_Text}>60</h1>
          <h1 className={styles.Nav_Text}>120</h1>
        </div>
        <div className={styles.Input_Container}></div>
      </div>
    </>
  )
}

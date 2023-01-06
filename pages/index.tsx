import styles from '../styles/Home.module.css';
import { useState } from 'react'
export default function Home() {
   const time = ["15", "30", "60", "120"]
   const words = ["10", "25", "50", "100"]
   const quote = []
   const list:string[] = ["10"]
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
                    {words.map((element: string) => <div className={styles.Nav_Text} key = {element}></div>)}
                </div>
                <div className={styles.Input_Container}></div>
            </div>
        </>
    )
}

import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.result}>

            <table>
                <thead>
                    <tr>
                        <th>WPM</th>
                        <th>Acc</th>
                        <th>Raw WPM</th>
                        <th>Characters</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>89</td>
                        <td>90%</td>
                        <td>97</td>
                        <td>135{' '}/{' '}24</td>
                        <td>0:30</td>
                    </tr>
                    <tr>
                        <td>89</td>
                        <td>90%</td>
                        <td>97</td>
                        <td>135{' '}/{' '}24</td>
                        <td>0:30</td>
                    </tr>
                    <tr>
                        <td>89</td>
                        <td>90%</td>
                        <td>97</td>
                        <td>135{' '}/{' '}24</td>
                        <td>0:30</td>
                    </tr>
                    <tr>
                        <td>89</td>
                        <td>90%</td>
                        <td>97</td>
                        <td>135{' '}/{' '}24</td>
                        <td>0:30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Footer
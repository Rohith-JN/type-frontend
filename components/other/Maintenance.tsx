import Head from 'next/head';

const Maintenance = () => {

    return (<div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Head>
            <title>Type / Maintenance</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>Website is currently under Maintenance</p>
    </div>)
}
export default Maintenance

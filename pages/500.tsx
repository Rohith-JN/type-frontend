import Head from 'next/head';

const Custom500 = () => {
    return (<div style={{ width: "100%", height: "87vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Head>
            <title>Error | 500</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>500 | Internal Server Error</p>
    </div>)
}
export default Custom500
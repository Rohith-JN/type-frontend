import Head from 'next/head';

const ErrorPage500 = () => {
    return (<div style={{ width: "100%", height: "96vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Head>
            <title>Error | 500</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>500 | Internal server error</p>
    </div>)
}
export default ErrorPage500

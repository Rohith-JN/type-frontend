import Head from 'next/head';

const Custom404 = () => {
    return (<div style={{ width: "100%", height: "87vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Head>
            <title>Error | 404</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>404 | Page not found</p>
    </div>)
}
export default Custom404

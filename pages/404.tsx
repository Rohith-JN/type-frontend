import Head from 'next/head';

const ErrorPage404 = () => {
    return (<div style={{ width: "100%", height: "96vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Head>
            <title>Error | 404</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "white" }}>404 | page could not be found</p>
    </div>)
}
export default ErrorPage404
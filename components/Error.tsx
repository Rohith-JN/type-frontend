import Head from 'next/head';

const ErrorPage = ({ statusCode, statusMessage }: { statusCode: number, statusMessage: string }) => {
    return (<div style={{ width: "100%", height: "96vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Head>
            <title>Error | {statusCode}</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "white" }}>{statusCode} | {statusMessage}</p>
    </div>)
}
export default ErrorPage
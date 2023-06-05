import Head from 'next/head';

const CustomError = ({ statusCode, statusMessage }: { statusCode: number | null, statusMessage: string }) => {

    return (<div style={{ width: "100%", height: "85vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Head>
            <title>Type / Error</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>{statusCode ? statusCode : null} {statusCode ? '|' : null} {statusMessage}</p>
    </div>)
}
export default CustomError

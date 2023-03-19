import Head from 'next/head';


const CustomError = ({ statusCode, statusMessage }: { statusCode: number, statusMessage: string }) => {

    return (<div style={{ width: "100%", height: "87vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Head>
            <title>Error | {statusCode}</title>
        </Head>
        <p style={{ fontFamily: 'lexend', fontSize: "1.1rem", color: "var(--text-color)" }}>{statusCode} | {statusMessage}</p>
    </div>)
}
export default CustomError

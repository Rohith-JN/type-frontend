import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import Router from "next/router";
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <Layout>
            {loading ? (<Loader />) : (<Component {...pageProps} />)}
        </Layout>
    );
}

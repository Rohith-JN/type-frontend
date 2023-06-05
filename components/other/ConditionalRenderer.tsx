import React, { useEffect, useState } from 'react';
import CustomError from './Error';
import Loader from './Loader';
import { ReactNode } from 'react';
import Head from 'next/head';

interface ConditionalRendererProps {
    data: boolean;
    fetching: boolean;
    title: string;
    children: ReactNode;
}

const ConditionalRenderer: React.FC<ConditionalRendererProps> = ({
    data,
    fetching,
    title,
    children,
}) => {
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        setContentLoaded(true);
    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (contentLoaded) {
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 900);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [contentLoaded]);

    if (data && !loading) {
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                {children}
            </>
        );
    } else if (!loading && !fetching && !data) {
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div>
                    <CustomError statusCode={500} statusMessage={'Internal Server Error'} />
                </div>
            </>
        );
    } else if (loading || fetching) {
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <Loader />
            </>
        );
    }

    return null;
};

export default ConditionalRenderer


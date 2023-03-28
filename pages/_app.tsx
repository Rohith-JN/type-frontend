import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../store/store";
import { Provider as ReduxProvider } from 'react-redux';
import { createClient, Provider as UrqlProvider } from 'urql';
import { CookiesProvider } from "react-cookie"

const client = createClient({
    url: 'http://localhost:4000/graphql',
});

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthUserProvider>
            <UrqlProvider value={client}>
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CookiesProvider>
                </ReduxProvider>
            </UrqlProvider>
        </AuthUserProvider>
    );
}

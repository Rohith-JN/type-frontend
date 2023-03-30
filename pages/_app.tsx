import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../store/store";
import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from "react-cookie"

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthUserProvider>
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CookiesProvider>
                </ReduxProvider>
        </AuthUserProvider>
    );
}

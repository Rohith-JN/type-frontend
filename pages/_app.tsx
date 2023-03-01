import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../store/store";
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {

    return (
        <Layout>
            <AuthUserProvider>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </AuthUserProvider>
        </Layout>
    );
}

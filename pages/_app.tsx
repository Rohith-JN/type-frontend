import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../store/store";
import { Provider as ReduxProvider } from 'react-redux';
import { createClient, Provider as UrqlProvider } from 'urql';

const client = createClient({
    url: 'http://localhost:4000/graphql',
});

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthUserProvider>
            <UrqlProvider value={client}>
                <ReduxProvider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ReduxProvider>
            </UrqlProvider>
        </AuthUserProvider>
    );
}

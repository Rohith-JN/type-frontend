import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/other/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../context/store";
import { Provider as ReduxProvider } from 'react-redux';
import { urqlClient } from '../utils/createUrqlClient';
import { Provider as UrqlProvider } from 'urql';
import { CookiesProvider } from "react-cookie"
import { ToastContainer } from 'react-toastify';
import '../styles/Test.css';
import Maintenance from '../components/other/Maintenance'

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthUserProvider>
            <UrqlProvider value={urqlClient}>
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            draggable
                            theme="colored"
                            icon={false}
                        />
                        {
                            (process.env.NEXT_PUBLIC_MAINTENANCE === '0') ? <Layout><Component {...pageProps} /></Layout> : <Maintenance />
                        }

                    </CookiesProvider>
                </ReduxProvider>
            </UrqlProvider>
        </AuthUserProvider>
    );
}

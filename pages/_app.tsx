import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/other/Layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../firebase/auth';
import { store } from "../context/store";
import { Provider as ReduxProvider } from 'react-redux';
import { urqlClient } from '../utils/createUrqlClient';
import { Provider as UrqlProvider } from 'urql';
import { ToastContainer } from 'react-toastify';
import '../styles/Test.css';
import Maintenance from '../components/other/Maintenance'

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthUserProvider>
            <UrqlProvider value={urqlClient}>
                <ReduxProvider store={store}>
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
                        (process.env.MAINTENANCE === '0') ? <Layout><Component {...pageProps} /></Layout> : <Maintenance />
                    }
                </ReduxProvider>
            </UrqlProvider>
        </AuthUserProvider>
    );
}

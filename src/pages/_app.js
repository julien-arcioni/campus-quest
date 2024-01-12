// /src/pages/_app.js

import '../app/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            });
        }
    }, []);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

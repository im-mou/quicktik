import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from 'react-query';
// import ModalsProviderWrapper from '../modals';
import Database from '../database';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
    const queryClient = new QueryClient();

    // localstate
    const [appSetupinished, setAppSetupinished] = useState(false);

    // Initialize App
    useEffect(() => {
        async function init() {
            // Initialize pouchDB -> tables
            await Database.getInstance().init();
            setAppSetupinished(true);
        }

        init();
    }, []);

    return (
        <>
            <Head>
                <title>QuickTik</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta name="description" content="A simple time bounded to-do task scheduler." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <QueryClientProvider client={queryClient}>
                <StoreProvider>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme: 'light'
                        }}
                    >
                        <NotificationsProvider>
                            {/* <ModalsProviderWrapper> */}
                            {appSetupinished ? <Component {...pageProps} /> : <LoadingOverlay visible />}
                            {/* </ModalsProviderWrapper> */}
                        </NotificationsProvider>
                    </MantineProvider>
                </StoreProvider>
            </QueryClientProvider>
        </>
    );
}

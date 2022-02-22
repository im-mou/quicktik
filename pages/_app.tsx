import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalsProviderWrapper from '../Modals';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const queryClient = new QueryClient();

    return (
        <>
            <Head>
                <title>QuickTik</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <meta
                    name="description"
                    content="A simple time bounded to-do task scheduler."
                />
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
                            <ModalsProviderWrapper>
                                <Component {...pageProps} />
                            </ModalsProviderWrapper>
                        </NotificationsProvider>
                    </MantineProvider>
                </StoreProvider>
            </QueryClientProvider>
        </>
    );
}

import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import GroupsConfigModal from '../Modals/GroupsConfigModal';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const queryClient = new QueryClient();

    // creat modals list for MOdals context
    const modals = {
        groupsConfig: GroupsConfigModal
    };

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
                            <ModalsProvider modals={modals}>
                                <Component {...pageProps} />
                            </ModalsProvider>
                        </NotificationsProvider>
                    </MantineProvider>
                </StoreProvider>
            </QueryClientProvider>
        </>
    );
}

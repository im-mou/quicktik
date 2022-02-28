import type { NextPage } from 'next';
import { AppShell, Header, LoadingOverlay } from '@mantine/core';
import TopBar from '../components/TopBar';
import { useStore } from '../store';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { settingsService } from '../services/settings.service';

const Home: NextPage = observer(() => {
    // gloabl state
    const { RootStore, GroupsStore } = useStore();

    // Hooks
    const router = useRouter();

    // Initialize Home page
    useEffect(() => {
        async function init() {
            // Check if it's the first time that a user is using the app
            const isAppInitialized = await settingsService.isAppInitialized();

            if (!isAppInitialized) {
                // if app not initialized, redirect to the 'welcome page' / setup page
                router.push('/welcome');
            } else {
                // Initialize stores
                await GroupsStore.init();
                RootStore.setAppLoaded();
            }
        }

        init();
    }, []);

    // Show loading overlay if app is not fully loaded
    if (!RootStore.appLoaded) {
        return <LoadingOverlay visible />;
    }

    return (
        <AppShell
            padding="md"
            header={
                <Header height="auto" sx={{ padding: 0 }} fixed>
                    <TopBar />
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                }
            })}
        >
            body
        </AppShell>
    );
});

export default Home;

import type { NextPage } from 'next';
import { ActionIcon, AppShell, Header, LoadingOverlay, useMantineColorScheme } from '@mantine/core';
import TopBar from '../components/TopBar';
import { useStore } from '../store';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { settingsService } from '../services/settings.service';
import TaskCreator from '../components/TaskCreator';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const Home: NextPage = observer(() => {
    // gloabl state
    const { RootStore, GroupsStore } = useStore();

    // Hooks
    const router = useRouter();

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

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
            padding={0}
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
            {/** App content */}
            <TaskCreator />

            {/** toggle dark mode */}
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {dark ? <SunIcon style={{ width: 18, height: 18 }} /> : <MoonIcon style={{ width: 18, height: 18 }} />}
            </ActionIcon>
        </AppShell>
    );
});

export default Home;

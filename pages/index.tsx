import type { NextPage } from 'next';
import { AppShell, Header, LoadingOverlay } from '@mantine/core';
import TopBar from '../components/TopBar';
import { useStore } from '../store';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const Home: NextPage = observer(() => {
    const { RootStore, GroupsStore } = useStore();

    // Initialize RootStore
    useEffect(() => {
        async function init() {
            await GroupsStore.init();
            RootStore.setAppLoaded();
            console.log('hello');
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
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            })}
        >
            body
        </AppShell>
    );
});

export default Home;

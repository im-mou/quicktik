import type { NextPage } from 'next';
import { AppShell, Header } from '@mantine/core';
import TopBar from '../components/TopBar';

const Home: NextPage = () => {
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
};

export default Home;

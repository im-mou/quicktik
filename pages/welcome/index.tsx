import type { NextPage } from 'next';
import { AppShell, Header, LoadingOverlay } from '@mantine/core';
import TopBar from '../../components/TopBar';
import { useStore } from '../../store';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const Home: NextPage = observer(() => {
    const { RootStore, GroupsStore } = useStore();

    // Initialize RootStore
    useEffect(() => {
        console.log('wellcome');
    }, []);

    return (
        <>Wellcome</>
    );
});

export default Home;

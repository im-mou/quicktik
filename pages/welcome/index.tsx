import type { NextPage } from 'next';
import { Box, AppShell, Divider, LoadingOverlay } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { settingsService } from '../../services/settings.service';
import { useRouter } from 'next/router';
import { useNotifications } from '@mantine/notifications';
import WelcomeHeader from '../../components/Welcome/Header';
import WelcomeUploadProfileImage from '../../components/Welcome/UploadProfileImage';
import WelcomeForm from '../../components/Welcome/Form';
import WelcomeFooter from '../../components/Welcome/Footer';

// Main component
const Welcome: NextPage = () => {
    // local state
    const [loading, setLoading] = useState<boolean>(false);
    const profileImageRef = useRef<File>();

    // Hooks
    const notifications = useNotifications();
    const router = useRouter();

    // Initialize RootStore
    useEffect(() => {
        async function init() {
            // Check if it's the first time that a user is using the app
            const isAppInitialized = await settingsService.isAppInitialized();

            if (isAppInitialized) {
                // if app is initialized, redirect to the 'home' page
                router.push('/');
            }
        }

        init();
    }, []);

    // Handle form submit
    const handleFormSubmit = async (event: any) => {
        setLoading(true);

        // get form data
        event.preventDefault();
        const fullname = event.target.elements.fullname.value;
        const boardname = event.target.elements.boardname.value;
        const boardColor = event.target.elements.color.value;

        // dead simple validation
        if (!fullname || !boardname) throw new Error('Some form values were not provided');

        try {
            // initialize app data
            await settingsService.initializeAppData({
                group: { label: boardname, color: boardColor, order: 0 },
                userData: {
                    name: fullname,
                    profile_image: profileImageRef.current
                }
            });

            // redirect to homepage once file has finished loaded
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (e) {
            console.error(e);
            setLoading(false);
            notifications.showNotification({
                title: 'Oops!',
                message: 'Something went wrong...',
                color: 'red'
            });
        }
    };

    return (
        <AppShell
            padding={0}
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                }
            })}
        >
            <LoadingOverlay visible={loading} />

            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        // background: '#bbb',
                        textAlign: 'center'
                    }}
                >
                    <WelcomeHeader />

                    <form onSubmit={handleFormSubmit}>
                        <WelcomeUploadProfileImage imageFileRef={profileImageRef} />
                        <WelcomeForm />
                    </form>

                    <Divider my={48} labelPosition="center" variant="dashed" />

                    <WelcomeFooter />
                </Box>
            </div>
        </AppShell>
    );
};

export default Welcome;

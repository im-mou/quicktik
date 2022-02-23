import type { NextPage } from 'next';
import {
    Box,
    AppShell,
    Text,
    BoxProps,
    Input,
    Divider,
    ColorSwatch,
    Menu,
    DEFAULT_THEME,
    ColorPicker,
    Button,
    Grid,
    Center,
    Avatar,
    Tooltip,
    UnstyledButton,
    LoadingOverlay
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import LogoIcon from '../../assets/images/quicktik-icon.png';
import Image from 'next/image';
import {
    PersonIcon,
    DashboardIcon,
    RocketIcon,
    ExclamationTriangleIcon
} from '@radix-ui/react-icons';
import { GROUP_COLORS_LIST } from '../../utils/constants';
import { useForm } from '@mantine/hooks';
import { settingsService } from '../../services/settings.service';
import { useRouter } from 'next/router';
import { useNotifications } from '@mantine/notifications';

// Dumb local component
const BoxCenteredContent = (props: BoxProps<any>) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
            {...props}
        />
    );
};

// Main component
const Welcome: NextPage = () => {
    // local state
    const [groupColor, setGroupColor] = useState(
        () => DEFAULT_THEME.colors.green[5]
    );
    const [profilePic, setProfilePic] = useState<File>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>();

    // Hooks
    const notifications = useNotifications();
    const router = useRouter();
    const form = useForm({
        initialValues: {
            fullname: '',
            boardname: ''
        },

        validationRules: {
            fullname: (value) => value.trim().length > 0,
            boardname: (value) => value.trim().length > 0
        }
    });

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
    const handleFormSubmit = async (values: typeof form['values']) => {
        setLoading(true);

        try {
            // initialize app data
            await settingsService.initializeAppData({
                group: { label: values.boardname, color: groupColor, order: 0 },
                userData: {
                    name: values.fullname,
                    profile_image: profilePic
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

    const changeHandler = (event: any) => {
        setProfilePic(event.target.files[0]);
    };

    const resetImageInput = () => {
        setProfilePic(null);
        fileInputRef.current.files = null;
    };

    return (
        <AppShell
            padding={0}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
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
                    {/** APP Logo */}

                    <Image
                        height={40}
                        width={40}
                        src={LogoIcon}
                        alt="QuickTik Logo"
                    />

                    <BoxCenteredContent mb={64}>
                        <Text size="lg" weight="bold" color="gray">
                            Welcome to QuickTik
                        </Text>
                        <Text size="xs" color="gray">
                            Provide your info and you're all setup
                        </Text>
                    </BoxCenteredContent>

                    <form onSubmit={form.onSubmit(handleFormSubmit)}>
                        <BoxCenteredContent>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={changeHandler}
                            />
                            <UnstyledButton
                                onClick={() => fileInputRef?.current.click()}
                                sx={(theme) => ({
                                    overflow: 'hidden',
                                    background: '#fff',
                                    borderRadius: 16,
                                    border: `1px solid ${theme.colors.gray[3]}`,
                                    transition: 'all 250ms',
                                    '&:hover': {
                                        boxShadow: theme.shadows.xl
                                    }
                                })}
                            >
                                {profilePic ? (
                                    <img
                                        src={URL.createObjectURL(profilePic)}
                                        height={100}
                                        width={100}
                                        alt="profile pic"
                                    />
                                ) : (
                                    <Center
                                        sx={{
                                            height: 100,
                                            width: 100,
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Avatar radius="xl" mb={4} />
                                        <Text size="xs" color="dimmed">
                                            Upload image
                                        </Text>
                                    </Center>
                                )}
                            </UnstyledButton>

                            {profilePic && (
                                <Button
                                    mt={4}
                                    variant="light"
                                    color="red"
                                    compact
                                    onClick={resetImageInput}
                                >
                                    Remove
                                </Button>
                            )}
                        </BoxCenteredContent>

                        <BoxCenteredContent my={32}>
                            <Box
                                sx={(theme) => ({
                                    background: '#fff',
                                    borderRadius: 8,
                                    width: '100%',
                                    border: `1px solid ${theme.colors.gray[3]}`
                                })}
                            >
                                <Input
                                    required
                                    my={8}
                                    icon={<PersonIcon />}
                                    variant="unstyled"
                                    placeholder="Your full name"
                                    size="md"
                                    {...form.getInputProps('fullname')}
                                />

                                <Divider
                                    sx={(theme) => ({
                                        borderColor: theme.colors.gray[3]
                                    })}
                                />

                                <Input
                                    required
                                    my={8}
                                    icon={<DashboardIcon />}
                                    variant="unstyled"
                                    placeholder="Board name (ex.: My Tasks)"
                                    {...form.getInputProps('boardname')}
                                    size="md"
                                    rightSectionProps={{
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            paddingRight: 14
                                        }
                                    }}
                                    rightSection={
                                        <Menu
                                            placement="center"
                                            withArrow
                                            closeOnItemClick={false}
                                            size="lg"
                                            control={
                                                <Tooltip
                                                    label="Choose board color"
                                                    withArrow
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <ColorSwatch
                                                        color={groupColor}
                                                        style={{
                                                            color: '#fff',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </Tooltip>
                                            }
                                        >
                                            <Menu.Label>
                                                Select a color for your board
                                            </Menu.Label>
                                            <Menu.Item component="div">
                                                <ColorPicker
                                                    format="hex"
                                                    swatches={GROUP_COLORS_LIST}
                                                    value={groupColor}
                                                    onChange={setGroupColor}
                                                />
                                            </Menu.Item>
                                        </Menu>
                                    }
                                />
                            </Box>
                        </BoxCenteredContent>

                        <Button
                            type="submit"
                            sx={{ paddingLeft: 48, paddingRight: 48 }}
                            rightIcon={<RocketIcon />}
                        >
                            Let's go
                        </Button>
                    </form>

                    <Divider my={48} labelPosition="center" variant="dashed" />

                    <Box sx={{ textAlign: 'left' }}>
                        <Grid>
                            <Grid.Col span={2}>
                                <ExclamationTriangleIcon
                                    style={{ height: 38, width: 28 }}
                                />
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text size="xs" color="gray">
                                    All your data will be stored locally in your
                                    device using IndexedDB so be careful when
                                    clearing browser data.
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </AppShell>
    );
};

export default Welcome;

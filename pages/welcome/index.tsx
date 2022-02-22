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
    Tooltip
} from '@mantine/core';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
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
import { groupsService } from '../../services/groups.service';

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

    // gloabal state
    // const { GroupsStore } = useStore();

    const form = useForm({
        initialValues: {
            fullname: '',
            boardname: 'My Tasks'
        },

        validationRules: {
            fullname: (value) => value.trim().length > 0,
            boardname: (value) => value.trim().length > 0
        }
    });

    // Initialize RootStore
    useEffect(() => {
        console.log('wellcome');
    }, []);

    const handleFormSubmit = async (values: typeof form['values']) => {
        try {
            // Create a new board
            const newGroup = await groupsService.createGroup({
                value: {
                    label: values.boardname,
                    color: groupColor,
                    order: 0
                }
            });

            // Set the newly created group as currently selected board



        } catch (e) {
            console.error(e);
        }
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
                            <Center
                                sx={(theme) => ({
                                    padding: 8,
                                    background: '#fff',
                                    borderRadius: 16,
                                    height: 100,
                                    width: 100,
                                    flexDirection: 'column',
                                    border: `1px solid ${theme.colors.gray[3]}`
                                })}
                            >
                                <Avatar radius="xl" />
                                <Text size="xs" color="dimmed">
                                    Upload image
                                </Text>
                            </Center>
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
                                            <Menu.Item>
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

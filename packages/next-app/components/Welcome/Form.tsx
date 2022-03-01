import { memo, useState } from 'react';
import {
    Box,
    BoxProps,
    Input,
    Divider,
    ColorSwatch,
    Menu,
    DEFAULT_THEME,
    ColorPicker,
    Button,
    Tooltip
} from '@mantine/core';
import { PersonIcon, DashboardIcon, RocketIcon } from '@radix-ui/react-icons';
import { GROUP_COLORS_LIST } from '../../config/constants';
import { useForm } from '@mantine/hooks';
import BoxCenteredContent from '../BoxCenteredContent';

// color selector menu
const ColorSwatchMenu: React.FC = memo(() => {
    // local state
    const [groupColor, setGroupColor] = useState(() => DEFAULT_THEME.colors.green[5]);

    return (
        <>
            <input type="hidden" required value={groupColor} name="color" />
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
                <Menu.Label>Select a color for your board</Menu.Label>
                <Menu.Item component="div">
                    <ColorPicker
                        format="hex"
                        swatches={GROUP_COLORS_LIST}
                        value={groupColor}
                        onChange={setGroupColor}
                    />
                </Menu.Item>
            </Menu>
        </>
    );
});

// Main component
const Form: React.FC = () => {
    return (
        <>
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
                        name="fullname"
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
                        size="md"
                        name="boardname"
                        rightSectionProps={{
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingRight: 14
                            }
                        }}
                        rightSection={<ColorSwatchMenu />}
                    />
                </Box>
            </BoxCenteredContent>

            <Button type="submit" sx={{ paddingLeft: 48, paddingRight: 48 }} rightIcon={<RocketIcon />}>
                Let&apos;s go
            </Button>
        </>
    );
};

export default Form;

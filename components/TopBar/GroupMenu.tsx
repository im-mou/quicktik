import { forwardRef, memo, useCallback, useRef } from 'react';
import { Menu, Divider, Text, Input } from '@mantine/core';
import {
    Group,
    UnstyledButton,
    UnstyledButtonProps,
    DEFAULT_THEME
} from '@mantine/core';
import {
    ChevronDownIcon,
    GearIcon,
    ExternalLinkIcon
} from '@radix-ui/react-icons';

import { TGroup } from '../../types';
import CircleCheckIcon from '../icons/CircleCheckIcon';

// types and interaces
interface GroupButtonProps extends UnstyledButtonProps {
    color: string;
}

// Constants
const menuItems: TGroup[] = [
    {
        id: '23412-3534-5345-fg',
        label: 'Home',
        color: DEFAULT_THEME.colors.green[5],
        order: 0
    },
    {
        id: '23412-sdfsdf-5345-fg',
        label: 'University',
        color: DEFAULT_THEME.colors.orange[5],
        order: 1
    }
];

// Group Selector Button Component
const GroupButton = forwardRef<HTMLButtonElement, GroupButtonProps>(
    ({ children, color, ...others }: GroupButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                minWidth: 100,
                padding: theme.spacing.md,
                borderBottom: `4px solid ${
                    color || DEFAULT_THEME.colors.gray[3]
                }`,
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            })}
            {...others}
        >
            <Group>
                <div style={{ flex: 1, minWidth: 100 }}>
                    <Text color="dimmed" size="xs">
                        Board
                    </Text>
                    <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                        {children}
                    </Text>
                </div>
                <ChevronDownIcon />
            </Group>
        </UnstyledButton>
    )
);

// Main component
const GroupMenu: React.FC = memo(() => {
    const currentGroup = menuItems[0];

    // Localstate
    const inputRef = useRef<HTMLInputElement>(null);

    // get group color inidicator for the button
    const getSelectedGroupColor = (): string => {
        return DEFAULT_THEME.colors.green[5];
    };

    // create a new group
    const createNewGroup = (group: Partial<TGroup>) => {
        // Add group to store
        console.log(group);
    };

    const changeSelectedGroup = useCallback(
        (group: TGroup) => () => {
            console.log(group);
        },
        []
    );

    // Handle input
    const onKeyDown = useCallback((event) => {
        if (
            event.charCode === 13 &&
            inputRef?.current &&
            inputRef.current.value.trim().length
        ) {
            // create group
            createNewGroup({
                label: inputRef.current.value.trim(),
                color: DEFAULT_THEME.colors.gray[1]
            });

            // Reset input
            inputRef.current.value = '';
        }
    }, []);

    return (
        <Menu
            size="lg"
            withArrow
            placement="center"
            closeOnItemClick={false}
            control={
                <GroupButton title="Home" color={getSelectedGroupColor()}>
                    Home
                </GroupButton>
            }
        >
            <Menu.Label>
                <Input
                    ref={inputRef}
                    radius="xs"
                    variant="unstyled"
                    placeholder="Create a new group..."
                    onKeyPress={onKeyDown}
                />
            </Menu.Label>

            <Divider />

            <Menu.Label>Select a group or create one</Menu.Label>
            {menuItems
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                    <Menu.Item
                        onClick={changeSelectedGroup(item)}
                        key={item.label}
                        icon={
                            <CircleCheckIcon
                                color={item.color}
                                selected={currentGroup.id === item.id}
                            />
                        }
                    >
                        {item.label}
                    </Menu.Item>
                ))}

            <Divider />

            <Menu.Item
                icon={<GearIcon />}
                rightSection={<ExternalLinkIcon color="gray" />}
            >
                Manage Groups
            </Menu.Item>
        </Menu>
    );
});

export default GroupMenu;

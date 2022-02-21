import { forwardRef, useCallback, useRef } from 'react';
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

import { IGroup } from '../../types';
import CircleCheckIcon from '../icons/CircleCheckIcon';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import { groupsService } from '../../services/groups.service';
import { useMutation } from 'react-query';
import { helpers } from '../../common/helpers';

// types and interaces
interface GroupButtonProps extends UnstyledButtonProps {
    color: string;
}

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
                <div style={{ flex: 1, minWidth: 100 }}>{children}</div>
                <ChevronDownIcon />
            </Group>
        </UnstyledButton>
    )
);

// Main component
const GroupMenu: React.FC = observer(() => {
    // global state
    const { GroupsStore } = useStore();

    // Localstate
    const inputRef = useRef<HTMLInputElement>(null);

    // call to create a new group in the DB
    const { mutate: mutateCreateGroup } = useMutation(
        groupsService.createGroup,
        {
            onSuccess: ({ data }) => {
                // add group to store
                GroupsStore.addNewGroup(data);
            }
        }
    );

    // call to select a group
    const { mutate: mutateSelectGroup } = useMutation(
        groupsService.selectGroup,
        {
            onSuccess: ({ data }) => {
                // add group to store
                GroupsStore.setSelectedGroup(data);
            }
        }
    );

    // get group color inidicator for the button
    const getSelectedGroupColor = (): string => {
        return GroupsStore.selectedGroup
            ? GroupsStore.selectedGroup.color
            : DEFAULT_THEME.colors.gray[2];
    };

    // create a new group
    const createNewGroup = (group: IGroup) => {
        mutateCreateGroup({ value: group });
    };

    // change selected group
    const changeSelectedGroup = useCallback(
        (group: IGroup) => () => {
            mutateSelectGroup({ id: group.id });
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
                color: helpers.randomColor(),
                order: GroupsStore.groups.length
                    ? GroupsStore.groups[GroupsStore.groups.length - 1].order +
                      1
                    : 0
            });

            // Reset input
            inputRef.current.value = '';
        }
    }, []);

    return (
        <Menu
            size="md"
            withArrow
            placement="center"
            closeOnItemClick={false}
            control={
                <GroupButton color={getSelectedGroupColor()}>
                    {GroupsStore.selectedGroup ? (
                        <>
                            <Text color="dimmed" size="xs">
                                Board
                            </Text>
                            <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                                {GroupsStore.selectedGroup.label}
                            </Text>
                        </>
                    ) : (
                        <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                            Create New Group
                        </Text>
                    )}
                </GroupButton>
            }
        >
            {/**
             * Group Name Input
             */}
            <Menu.Label>
                <Input
                    ref={inputRef}
                    radius="xs"
                    variant="unstyled"
                    placeholder="Create a new group..."
                    onKeyPress={onKeyDown}
                />
            </Menu.Label>

            {GroupsStore.groups.length && <Divider />}

            {/**
             * Group List
             */}
            {GroupsStore.groups.length && (
                <Menu.Label>Select a group or create one</Menu.Label>
            )}

            {GroupsStore.groups.map((item) => (
                <Menu.Item
                    onClick={changeSelectedGroup(item)}
                    key={item.label}
                    icon={
                        <CircleCheckIcon
                            color={item.color}
                            selected={GroupsStore.selectedGroup?.id === item.id}
                        />
                    }
                >
                    {item.label}
                </Menu.Item>
            ))}

            {GroupsStore.groups.length && <Divider />}

            {GroupsStore.groups.length && (
                <Menu.Item
                    icon={<GearIcon />}
                    rightSection={<ExternalLinkIcon color="gray" />}
                >
                    Manage Groups
                </Menu.Item>
            )}
        </Menu>
    );
});

export default GroupMenu;

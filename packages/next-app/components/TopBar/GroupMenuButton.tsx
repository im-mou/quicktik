import { forwardRef, useCallback, useRef } from 'react';
import { Menu, Divider, Text, Input } from '@mantine/core';
import { Group, UnstyledButton, UnstyledButtonProps, DEFAULT_THEME, ColorSwatch } from '@mantine/core';
import { ChevronDownIcon, GearIcon, ExternalLinkIcon, CheckIcon } from '@radix-ui/react-icons';

import { IGroup } from '../../types';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import { groupsService } from '../../services/groups.service';
import { useMutation } from 'react-query';
import { helpers } from '../../utils/helpers';

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
                height: '100%',
                minWidth: 100,
                padding: theme.spacing.md,
                // borderBottom: `4px solid ${color || DEFAULT_THEME.colors.gray[3]}`,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                position: 'relative',

                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                },

                '&:after': {
                    content: "''",
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: '100%',
                    background: color || DEFAULT_THEME.colors.gray[3]
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
const GroupMenuButton: React.FC = observer(() => {
    // global state
    const { GroupsStore } = useStore();

    // Localstate
    const inputRef = useRef<HTMLInputElement>(null);

    // call to create a new group in the DB
    const { mutate: mutateCreateGroup } = useMutation(groupsService.createGroup, {
        onSuccess: (data) => {
            // add group to store
            GroupsStore.addNewGroup(data);
        }
    });

    // call to select a group
    const { mutate: mutateSelectGroup } = useMutation(groupsService.selectGroup, {
        onSuccess: (data) => {
            // add group to store
            GroupsStore.setSelectedGroup(data);
        }
    });

    // get group color inidicator for the button
    const getSelectedGroupColor = (): string => {
        return GroupsStore.selectedGroup ? GroupsStore.selectedGroup.color : DEFAULT_THEME.colors.gray[2];
    };

    // create a new group
    const createNewGroup = (group: IGroup) => {
        mutateCreateGroup({ value: group });
    };

    // change selected group
    const changeSelectedGroup = useCallback(
        (group: IGroup) => () => {
            mutateSelectGroup({ id: group._id });
        },
        []
    );

    // Handle input
    const onKeyDown = useCallback((event) => {
        if (event.charCode === 13 && inputRef?.current && inputRef.current.value.trim().length) {
            // create group
            createNewGroup({
                label: inputRef.current.value.trim(),
                color: helpers.randomColor(),
                order: GroupsStore.groups.length ? GroupsStore.groups[GroupsStore.groups.length - 1].order + 1 : 0
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
            shadow="lg"
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

            <Divider />

            {/**
             * Group List
             */}
            <Menu.Label>Select a group or create one</Menu.Label>

            {GroupsStore.groups.map((item) => (
                <Menu.Item
                    onClick={changeSelectedGroup(item)}
                    key={item.label}
                    icon={
                        <ColorSwatch
                            component="div"
                            color={item.color}
                            styles={{
                                root: {
                                    color: '#fff',
                                    cursor: 'pointer'
                                },
                                children: { display: 'flex' }
                            }}
                        >
                            {GroupsStore.selectedGroup?._id === item._id && <CheckIcon />}
                        </ColorSwatch>
                    }
                >
                    {item.label}
                </Menu.Item>
            ))}

            <Divider />

            {GroupsStore.groups.length && (
                <Menu.Item icon={<GearIcon />} rightSection={<ExternalLinkIcon color="gray" />}>
                    Manage Groups
                </Menu.Item>
            )}
        </Menu>
    );
});

export default GroupMenuButton;

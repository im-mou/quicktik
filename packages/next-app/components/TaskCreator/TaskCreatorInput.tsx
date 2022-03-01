import { Group, Text, UnstyledButton } from '@mantine/core';
import { HamburgerMenuIcon, PlusCircledIcon } from '@radix-ui/react-icons';

const TaskCreatorInput = () => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                background: theme.colors.gray[theme.colorScheme === 'light' ? 1 : 7],
                padding: '12px 24px',
                borderRadius: 6,
                width: '100%',
                '&:hover': {
                    background: theme.colors.gray[theme.colorScheme === 'light' ? 2 : 8]
                }
            })}
        >
            <Group spacing="sm">
                {/* <HamburgerMenuIcon height={18} width={18} /> */}
                <Text size="lg" weight="bold" color="#aaa" style={{ flexGrow: 1 }}>
                    Create a new task
                </Text>
                <PlusCircledIcon height={20} width={20} color="#bbb" />
            </Group>
        </UnstyledButton>
    );
};

export default TaskCreatorInput;

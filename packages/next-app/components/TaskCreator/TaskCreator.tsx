import { Box, Container, DEFAULT_THEME } from '@mantine/core';
import { observer } from 'mobx-react';
import { APP_CONTAINER_WIDTH } from '../../config/constants';
import { useStore } from '../../store';
import TaskCreatorInput from './TaskCreatorInput';
import TasksTabs from './TasksTabs';

const TaskCreator = observer(() => {
    // global state
    const { GroupsStore } = useStore();

    const groupColor = GroupsStore.selectedGroup.color || DEFAULT_THEME.colors.gray[3];

    return (
        <Box
            sx={(theme) => ({
                background: theme.colorScheme === 'light' ? '#fff' : theme.colors.gray[9],
                position: 'relative',
                '&:after': {
                    content: "''",
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 2,
                    width: '100%',
                    background: `radial-gradient(${theme.fn.rgba(groupColor, 0.8)}, transparent 60%)`
                }
            })}
        >
            <Container size={APP_CONTAINER_WIDTH} padding={0}>
                <Box sx={{ padding: '32px 0' }}>
                    <TaskCreatorInput />
                </Box>
                <TasksTabs />
            </Container>
        </Box>
    );
});

export default TaskCreator;

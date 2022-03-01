import { useRef, useEffect, useState } from 'react';
import { Box, Container, DEFAULT_THEME } from '@mantine/core';
import { observer } from 'mobx-react';
import { APP_CONTAINER_WIDTH } from '../../config/constants';
import { useStore } from '../../store';
import TaskCreatorInput from './TaskCreatorInput';
import TasksTabs from './TasksTabs';

const TaskCreator = observer(() => {
    // global state
    const { GroupsStore } = useStore();

    // Local state
    const timeout = useRef<NodeJS.Timeout>(null);
    const [groupColor, setGroupColor] = useState({
        opacity: 0,
        color: GroupsStore.selectedGroup.color
    });

    // vars
    const bgColor = DEFAULT_THEME.colorScheme === 'light' ? '#fff' : DEFAULT_THEME.colors.gray[9];

    // Animate the bottom border
    useEffect(() => {
        // onload component take x:ms to set bottom border opacity to 1
        setGroupColor({ opacity: 0, color: 'transparent' });

        // dispose of old timeout if a new update has been dispatched
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        // change bottom border color when a diferent group is selected
        timeout.current = setTimeout(() => {
            setGroupColor({ opacity: 1, color: DEFAULT_THEME.fn.rgba(GroupsStore.selectedGroup.color, 0.8) });
        }, 300);
    }, [GroupsStore.selectedGroup.color]);

    return (
        <Box
            sx={(theme) => ({
                background: theme.colorScheme === 'light' ? '#fff' : DEFAULT_THEME.colors.gray[9],
                position: 'relative',
                '&:after': {
                    content: "''",
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 2,
                    width: '100%',
                    background: `radial-gradient(${groupColor.color}, transparent 60%)`,
                    opacity: groupColor.opacity,
                    transition: 'opacity 300ms ease-out'
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

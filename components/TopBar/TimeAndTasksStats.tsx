import { Box, DEFAULT_THEME, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';

// types and interfaces
interface ITimeAndTasksStats {
    pendingTasksCount?: number;
    completedTasksCount?: number;
    remainingTime?: { hours: number; minutes: number };
}

// Dumb components
const Separator = () => <Box sx={{ color: 'inherit' }}>·</Box>;

const TimeAndTasksStats = ({
    pendingTasksCount,
    completedTasksCount,
    remainingTime
}: ITimeAndTasksStats) => {
    return (
        <div>
            <Text size="sm" weight="bold" color="gray">
                {dayjs().format('dddd, MMMM D, YYYY')}
            </Text>
            <Group>
                <Text size="xs" color="dimmed">
                    {pendingTasksCount} Pending Tasks
                </Text>
                <Separator />
                <Text size="xs" color="dimmed">
                    {completedTasksCount} Completed Tasks
                </Text>
                <Separator />
                <Text size="xs" color="dimmed">
                    {remainingTime?.hours}h {remainingTime?.minutes}minutes
                    remaining
                </Text>
            </Group>
        </div>
    );
};

export default TimeAndTasksStats;

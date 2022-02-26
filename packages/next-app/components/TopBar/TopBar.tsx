import { Box, Group } from '@mantine/core';
import Logo from '../../assets/images/quicktik-logo.png';
import Image from 'next/image';
import ProfileButton from './ProfileButton';
import GroupMenu from './GroupMenu';
import TimeAndTasksStats from './TimeAndTasksStats';
import SearchBar from './SearchBar';
import { helpers } from '../../utils/helpers';

// Main component
const TopBar: React.FC = () => {
    return (
        <Group position="apart">
            <Box>
                <Group>
                    {/** APP Logo */}
                    <Box mx={40}>
                        <Image height={32} width={116} src={Logo} alt="QuickTik Logo" loader={helpers.imageLoader} />
                    </Box>

                    {/** datetime and Tasks simple stats */}
                    <TimeAndTasksStats
                        pendingTasksCount={2}
                        completedTasksCount={4}
                        remainingTime={{ minutes: 45, hours: 1 }}
                    />
                </Group>
            </Box>
            <Box>
                <Group spacing={8}>
                    <SearchBar />
                    <GroupMenu />
                    <ProfileButton name="Guest User" />
                </Group>
            </Box>
        </Group>
    );
};

export default TopBar;

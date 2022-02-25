import { Box, Text, Grid } from '@mantine/core';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

// Main component
const Footer: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'left' }}>
            <Grid>
                <Grid.Col span={2}>
                    <ExclamationTriangleIcon style={{ height: 38, width: 28 }} />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Text size="xs" color="gray">
                        All your data will be stored locally in your device using IndexedDB so be careful when clearing
                        browser data.
                    </Text>
                </Grid.Col>
            </Grid>
        </Box>
    );
};

export default Footer;

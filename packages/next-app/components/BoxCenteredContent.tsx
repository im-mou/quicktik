import { Box, BoxProps } from '@mantine/core';

const BoxCenteredContent = (props: BoxProps<any>) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
            {...props}
        />
    );
};

export default BoxCenteredContent;

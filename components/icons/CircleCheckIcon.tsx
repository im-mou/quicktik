import { CheckIcon } from '@radix-ui/react-icons';
import { Box } from '@mantine/core';

const CircleCheckIcon = ({
    selected,
    color
}: {
    selected: boolean;
    color: string;
}) => {
    return selected ? (
        <CheckIcon color={color} height={24} width={24} />
    ) : (
        <Box
            mx={4}
            sx={{
                height: 16,
                width: 16,
                background: color,
                borderRadius: 16,
                border: `1px solid rgba(0,0,0,0.1)`
            }}
        />
    );
};

export default CircleCheckIcon;

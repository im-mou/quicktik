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
        <CheckIcon
            color={color}
            height={20}
            width={20}
        />
    ) : (
        <Box
            mx={2}
            sx={{
                height: 14,
                width: 14,
                background: color,
                borderRadius: 16,
                border: `1px solid rgba(0,0,0,0.1)`
            }}
        />
    );
};

export default CircleCheckIcon;

import { forwardRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

import {
    Group,
    Avatar,
    Text,
    UnstyledButton,
    UnstyledButtonProps,
    DEFAULT_THEME
} from '@mantine/core';

// types and interaces
interface MyButtonProps extends UnstyledButtonProps {
    title: string;
    color: string;
    active: boolean;
}

// Main component
const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
    ({ title, color, active, ...others }: MyButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                minWidth: 100,
                padding: theme.spacing.md,
                borderBottom: `4px solid ${
                    color || DEFAULT_THEME.colors.gray[3]
                }`,
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            })}
            {...others}
        >
            <Group>
                <div style={{ flex: 1, minWidth: 100 }}>
                    <Text color="dimmed" size="xs">
                        Board
                    </Text>
                    <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                        {title}
                    </Text>
                </div>
                {active ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Group>
        </UnstyledButton>
    )
);

// Main component
const GroupButton: React.FC = () => {
    // get group color inidicator for the button
    const getGroupColor = (): string => {
        return DEFAULT_THEME.colors.green[5];
    };

    return <MyButton title="Home" color={getGroupColor()} active={false} />;
};

export default GroupButton;

import { forwardRef } from 'react';
import {
    Group,
    Avatar,
    Text,
    UnstyledButton,
    UnstyledButtonProps
} from '@mantine/core';

// types and interaces
interface ProfileButtonProps extends UnstyledButtonProps {
    name: string;
}

// Main component
const ProfileButton = forwardRef<HTMLButtonElement, ProfileButtonProps>(
    ({ name, ...others }: ProfileButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                padding: theme.spacing.md,
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
                <div style={{ flex: 1, textAlign: 'right' }}>
                    <Text color="dimmed" size="xs">
                        Good morning
                    </Text>
                    <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                        {name}
                    </Text>
                </div>

                <Avatar radius="xl" />
            </Group>
        </UnstyledButton>
    )
);

export default ProfileButton;

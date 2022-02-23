import { forwardRef, useEffect, useState } from 'react';
import {
    Group,
    Avatar,
    Text,
    UnstyledButton,
    UnstyledButtonProps,
    Loader
} from '@mantine/core';
import { settingsService } from '../../services/settings.service';
import { IUserConfig } from '../../types';

// types and interaces
interface ProfileButtonProps extends UnstyledButtonProps {
    name: string;
}

// Main component
const ProfileButton = forwardRef<HTMLButtonElement, ProfileButtonProps>(
    ({ name, ...others }: ProfileButtonProps, ref) => {
        const [userData, setUserData] = useState<IUserConfig>(null);
        const [profileImage, setProfileImage] = useState<Blob>(null);

        useEffect(() => {
            // fetch user data from data base
            settingsService.getUserSettings().then((data) => {
                setUserData(data);
            });

            // fetch user profile image
            settingsService
                .getUserProfileImage()
                .then((image) => {
                    setProfileImage(image as Blob);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, []);

        return (
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
                {!userData ? (
                    <Loader size="sm" />
                ) : (
                    <Group>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            <Text color="dimmed" size="xs">
                                Good morning
                            </Text>
                            <Text size="sm" weight={500} sx={{ lineHeight: 1 }}>
                                {userData.name}
                            </Text>
                        </div>
                        {/** Show user profile image if present */}
                        <Avatar
                            radius="md"
                            src={
                                profileImage
                                    ? URL.createObjectURL(profileImage)
                                    : undefined
                            }
                        />
                    </Group>
                )}
            </UnstyledButton>
        );
    }
);

export default ProfileButton;

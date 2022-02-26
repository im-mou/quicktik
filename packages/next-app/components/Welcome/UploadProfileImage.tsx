import { Text, Button, Center, Avatar, UnstyledButton } from '@mantine/core';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { helpers } from '../../utils/helpers';
import BoxCenteredContent from '../BoxCenteredContent';

const BUTTON_DIM = 100;

// Main component
const UploadProfileImage = ({ imageFileRef }: { imageFileRef: React.MutableRefObject<File> }) => {
    // local state
    const [profilePic, setProfilePic] = useState<File>(null);
    const fileInputRef = useRef<HTMLInputElement>();

    const changeHandler = (event: any) => {
        setProfilePic(event.target.files[0]);
        imageFileRef.current = event.target.files[0];
    };

    const resetImageInput = () => {
        setProfilePic(null);
        fileInputRef.current.files = null;
        imageFileRef.current = null;
    };

    return (
        <BoxCenteredContent>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={changeHandler}
            />
            <UnstyledButton
                onClick={() => fileInputRef?.current.click()}
                sx={(theme) => ({
                    overflow: 'hidden',
                    background: '#fff',
                    borderRadius: 16,
                    border: `1px solid ${theme.colors.gray[3]}`,
                    transition: 'all 250ms',
                    height: BUTTON_DIM,
                    width: BUTTON_DIM,
                    '&:hover': {
                        boxShadow: theme.shadows.xl
                    }
                })}
            >
                {profilePic ? (
                    <Image
                        src={URL.createObjectURL(profilePic)}
                        height={BUTTON_DIM}
                        width={BUTTON_DIM}
                        alt="profile pic"
                        loader={helpers.imageLoader}
                    />
                ) : (
                    <Center
                        sx={{
                            height: BUTTON_DIM,
                            width: BUTTON_DIM,
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar radius="xl" mb={4} />
                        <Text size="xs" color="dimmed">
                            Upload image
                        </Text>
                    </Center>
                )}
            </UnstyledButton>

            {profilePic && (
                <Button mt={4} variant="light" color="red" compact onClick={resetImageInput}>
                    Remove
                </Button>
            )}
        </BoxCenteredContent>
    );
};

export default UploadProfileImage;

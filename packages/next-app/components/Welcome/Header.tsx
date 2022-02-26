import { Text } from '@mantine/core';
import Image from 'next/image';
import { helpers } from '../../utils/helpers';
import BoxCenteredContent from '../BoxCenteredContent';
import LogoIcon from '../../assets/images/quicktik-icon.png';

// Main component
const Header: React.FC = () => {
    return (
        <>
            <Image height={40} width={40} src={LogoIcon} alt="QuickTik Logo" loader={helpers.imageLoader} />

            <BoxCenteredContent mb={64}>
                <Text size="lg" weight="bold" color="gray">
                    Welcome to QuickTik
                </Text>
                <Text size="xs" color="gray">
                    Provide your info and you&apos;re all setup
                </Text>
            </BoxCenteredContent>
        </>
    );
};

export default Header;

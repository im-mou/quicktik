import { ModalsProvider, ModalsProviderProps } from '@mantine/modals';
import GroupsConfigModal from './GroupsConfigModal';

// Modal context provider
const ModalsProviderWrapper = ({ children, ...props }: ModalsProviderProps) => {
    // create modals list for Modals context
    const modals = {
        'groups-config-modal': GroupsConfigModal
    };

    return (
        <ModalsProvider modals={modals} {...props}>
            {children}
        </ModalsProvider>
    );
};

export default ModalsProviderWrapper;

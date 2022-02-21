import { ContextModalProps } from '@mantine/modals';
import { Text, Button } from '@mantine/core';

const GroupsConfigModal = ({
    context,
    id,
    modalBody
}: ContextModalProps & { modalBody: string }) => (
    <>
        <Text size="sm">{modalBody}</Text>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
            Close modal
        </Button>
    </>
);

export default GroupsConfigModal;

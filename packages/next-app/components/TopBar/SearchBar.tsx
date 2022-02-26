import { Input } from '@mantine/core';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchBar = () => {
    return (
        <Input
            icon={<MagnifyingGlassIcon height={24} width={24} />}
            variant="unstyled"
            placeholder="Search Tasks..."
            size="md"
        />
    );
};

export default SearchBar;

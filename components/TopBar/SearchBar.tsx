import { Input } from '@mantine/core';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchBar = () => {
    return (
        <Input
            icon={<MagnifyingGlassIcon />}
            variant="unstyled"
            placeholder="Search Tasks..."
        />
    );
};

export default SearchBar;

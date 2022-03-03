import React from 'react';

const useMenu = () => {
    const [anchor, setAnchor] = React.useState(null);

    const open = (e: any, fn?: () => void) => {
        setAnchor(e.currentTarget);
        fn?.();
    };

    // material-ui Menu->onClose returns event and reason parameter
    const close = (e = null, reason = null, fn?: () => void) => {
        setAnchor(null);
        fn?.();
    };

    return [open, close, anchor];
};

export default useMenu;

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles((theme) => ({
    menuItemReorderContainer: {
        '&:hover': {
            '& $reorderIcon': {
                opacity: 1
            }
        }
    },
    reorderIcon: {
        cursor: 'grab',
        left: -2,
        top: '50%',
        opacity: 0,
        fontSize: 16,
        position: 'absolute',
        color: 'rgba(0, 0, 0, .2)',
        transform: 'translateY(-50%)'
    }
}));

const REORDER_MODE = {
    SWAP: 'swap',
    SHIFT: 'shift'
};

const DragHandle = React.memo(() => {
    const classes = useStyles();
    return <DragIndicatorIcon className={classes.reorderIcon} />;
});

const SortableList = ({ children, list, updateList, updateMode = REORDER_MODE.SWAP, prefix = uuidv4() }: any) => {
    const classes = useStyles();
    const dragItemRef = React.useRef(null);

    const handleDrag = (e: any) => {
        dragItemRef.current = e.currentTarget.id;
    };

    const handleDrop = (e: any) => {
        const dragItem = list.find((item: any) => `${prefix}-${item.id}` == dragItemRef.current);
        const dropItem = list.find((item: any) => `${prefix}-${item.id}` == e.currentTarget.id);

        const dragItemOrder = dragItem.order;
        const dropItemOrder = dropItem.order;

        let newItems = [];

        if (updateMode === REORDER_MODE.SWAP) {
            newItems = list
                .map((item: any) => ({ ...item })) // de-reference objects
                .map((item: any) => {
                    if (`${prefix}-${item.id}` == dragItemRef.current) {
                        item.order = dropItemOrder;
                    }
                    if (`${prefix}-${item.id}` == e.currentTarget.id) {
                        item.order = dragItemOrder;
                    }
                    return item;
                });
        } else {
            // Todo: Implement shift list
        }

        updateList(newItems.sort((a: any, b: any) => a.order - b.order));
    };

    return children.map((child: any) =>
        React.cloneElement(
            child,
            {
                id: `${prefix}-${child.key}`,
                draggable: true,
                onDragOver: (e) => e.preventDefault(),
                onDragStart: handleDrag,
                onDrop: handleDrop
                // className: `${child.className} ${classes.menuItemReorderContainer}`
            },
            child.children
            // React.createElement('span', {}, <DragHandle />, child.children)
        )
    );
};

export default SortableList;

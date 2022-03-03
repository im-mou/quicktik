import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import DragIndicatorRoundedIcon from '@material-ui/icons/DragIndicatorRounded';
import { observer } from 'mobx-react';
import taskCreatorStore from '../../TaskCreatorStore';

const CheckListInput = withStyles((theme) => ({
    root: {
        fontSize: 14,
        color: theme.palette.grey[600],
        marginLeft: theme.spacing(3.5)
    },
    icon: {
        color: theme.palette.grey[500]
    }
}))(({ classes, ...props }: Omit<InputBaseProps, 'classes'> & { classes: { root: string; icon: string } }) => (
    <React.Fragment>
        <InputBase
            fullWidth
            className={classes.root}
            placeholder="Add a milestore..."
            startAdornment={
                <InputAdornment position="start">
                    <AddIcon className={classes.icon} fontSize="small" />
                </InputAdornment>
            }
            {...props}
        />
    </React.Fragment>
));

const CheckListItem = withStyles((theme) => ({
    root: {
        fontSize: 14,
        color: theme.palette.grey[600],
        '&:hover': {
            '& $iconDrag': {
                opacity: 1
            },
            '& $iconRemove': {
                display: 'initial'
            }
        }
    },
    icon: {
        color: theme.palette.grey[400]
    },
    iconRemove: {
        cursor: 'pointer',
        color: theme.palette.grey[400],
        display: 'none'
    },
    iconDrag: {
        cursor: 'grab',
        color: theme.palette.grey[400],
        opacity: 0,
        marginRight: theme.spacing(1)
    }
}))(({ classes, id, onDelete, handleDrag, handleDrop, ...props }: any) => (
    <Box
        width={1}
        id={id}
        draggable={true}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}
        px={0.5}
        ml={-0.5}
    >
        <InputBase
            fullWidth
            className={classes.root}
            startAdornment={
                <InputAdornment onClick={onDelete} position="start">
                    <DragIndicatorRoundedIcon className={classes.iconDrag} fontSize="small" />
                    <CheckBoxOutlineBlank className={classes.icon} fontSize="small" />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment onClick={onDelete} position="end">
                    <ClearRoundedIcon className={classes.iconRemove} fontSize="small" />
                </InputAdornment>
            }
            {...props}
        />
    </Box>
));

const CheckListItemsList = observer(({ updateItem, deleteItem, handleDrag, handleDrop }: any) => {
    return (
        <React.Fragment>
            {taskCreatorStore.milestones
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                    <CheckListItem
                        key={item.id}
                        id={item.id}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        value={item.value}
                        onChange={updateItem(item.id)}
                        onDelete={() => deleteItem(item.id)}
                    />
                ))}
        </React.Fragment>
    );
});

const CheckList = () => {
    const textRef = React.useRef<HTMLInputElement>(null);
    const dragItemRef = React.useRef<any>(null);

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (textRef && textRef.current && textRef.current.value.trim() !== '') {
                taskCreatorStore.insertMilestone(textRef.current.value.trim());
                textRef.current.value = '';
            }
        }
    };

    const updateItem = (id: any) => (e: any) => {
        // delete if value is set to empty
        if (e.target.value === '') {
            deleteItem(id);
        } else {
            // update
            taskCreatorStore.updateMilestone(id, e.target.value.trim());
        }
    };

    const deleteItem = (id: any) => {
        taskCreatorStore.deleteMilestone(id);
    };

    const handleDrag = (e: any) => {
        dragItemRef.current = e.currentTarget.id;
    };

    const handleDrop = (e: any) => {
        const dragItem = taskCreatorStore.milestones.find((item) => item.id === dragItemRef.current);
        const dropItem = taskCreatorStore.milestones.find((item) => item.id === e.currentTarget.id);

        const dragItemOrder = dragItem.order;
        const dropItemOrder = dropItem.order;

        const newItems = taskCreatorStore.milestones
            .map((item) => ({ ...item })) // de-reference objects
            .map((item) => {
                if (item.id === dragItemRef.current) {
                    item.order = dropItemOrder;
                }
                if (item.id === e.currentTarget.id) {
                    item.order = dragItemOrder;
                }
                return item;
            });

        taskCreatorStore.setMilestones(newItems);
    };

    return (
        <React.Fragment>
            <CheckListItemsList
                updateItem={updateItem}
                deleteItem={deleteItem}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
            />
            <CheckListInput onKeyPress={handleKeyPress} inputRef={textRef} />
        </React.Fragment>
    );
};

export default React.memo(CheckList);

import React from 'react';

import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RemoveIcon from '@material-ui/icons/Remove';
import taskCreatorStore from '../../TaskCreatorStore';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontSize: 16,
        alignItems: 'center'
    },
    hourSelector: {
        padding: theme.spacing(0, 0.5),
        fontWeight: 'bold',
        color: theme.palette.grey[500],
        flexGrow: 0.5,
        justifyItems: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    minutesSelector: {
        color: theme.palette.grey['A200'],
        flexGrow: 0.5
    },
    button: {
        color: '#b8b8b8'
    }
}));

const MyIconButton = React.memo(({ children, ...props }: IconButtonProps) => {
    return (
        <IconButton {...props} color="inherit" size="small">
            {children}
        </IconButton>
    );
});

const TimeSelector = observer(() => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.hourSelector}>
                <Box className={classes.button}>
                    <MyIconButton disabled={taskCreatorStore.hours === 23} onClick={() => taskCreatorStore.incHours()}>
                        {taskCreatorStore.hours === 23 ? (
                            <RemoveIcon fontSize="inherit" />
                        ) : (
                            <ArrowUpIcon fontSize="inherit" />
                        )}
                    </MyIconButton>
                </Box>
                <Box>{taskCreatorStore.hours}h</Box>
                <Box className={classes.button}>
                    <MyIconButton disabled={taskCreatorStore.hours === 0} onClick={() => taskCreatorStore.decHours()}>
                        {taskCreatorStore.hours === 0 ? (
                            <RemoveIcon fontSize="inherit" />
                        ) : (
                            <ArrowDownIcon fontSize="inherit" />
                        )}
                    </MyIconButton>
                </Box>
            </Box>

            <Box className={classes.minutesSelector}>{taskCreatorStore.minutes}min</Box>
        </Box>
    );
});

export default TimeSelector;

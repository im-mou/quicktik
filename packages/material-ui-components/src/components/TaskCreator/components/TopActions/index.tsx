import React from 'react';

import { observer } from 'mobx-react';
import theme from '../../../../theme';
import { TASK_REPETITION as T_REPETITION } from '../../../../Utils/constants';

import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import Button from '../../../Button';
// import PopoverCalendar from '../../../Calendar/PopoverCalendar';

import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';
import TollTwoToneIcon from '@material-ui/icons/TollTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import useMenu from '../../../../Hooks/useMenu';
import { getUnderstandableDate } from '../../../../Utils';
import taskCreatorStore from '../../TaskCreatorStore';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1)
    }
}));

const TopActions = observer(() => {
    const classes = useStyles();

    taskCreatorStore;

    // menus states
    const [openCalendarMenu, closeCalendarMenu, calendarAnchor] = useMenu();

    const updateDate = (date: Date) => {
        taskCreatorStore.setDate(date);
    };

    return (
        <React.Fragment>
            {/* <PopoverCalendar
                anchor={calendarAnchor}
                updateDate={updateDate}
                initialDate={taskCreatorStore.date}
                handleCloseMenu={closeCalendarMenu}
            /> */}
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Button
                        rounded
                        size="small"
                        color="secondary"
                        className={classes.button}
                        onClick={(e) => {
                            if (taskCreatorStore.repetition !== T_REPETITION.LOOP) {
                                openCalendarMenu?.(e);
                            } else {
                                // if repetition === LOOP then toggle to ONCE
                                taskCreatorStore.setRepetition(T_REPETITION.ONCE);
                            }
                        }}
                        startIcon={
                            taskCreatorStore.repetition === T_REPETITION.LOOP ? (
                                <LoopIcon fontSize="small" color="primary" />
                            ) : (
                                <TodayTwoToneIcon fontSize="small" color="error" />
                            )
                        }
                    >
                        {taskCreatorStore.repetition === T_REPETITION.LOOP
                            ? 'Repeat everyday'
                            : getUnderstandableDate(taskCreatorStore.date)}
                    </Button>
                    <Badge variant="dot" color="primary" overlap="circle" invisible={!taskCreatorStore.groups.length}>
                        <Button
                            color="secondary"
                            size="small"
                            rounded
                            className={classes.button}
                            startIcon={
                                <TollTwoToneIcon
                                    fontSize="small"
                                    style={{
                                        color: theme.palette.success.main
                                    }}
                                />
                            }
                        >
                            Group
                        </Button>
                    </Badge>
                    {/* <Box display="inline-flex" ml={1}>
                        <Typography
                            variant="caption"
                            color={taskCreatorStore.repetition === T_REPETITION.LOOP ? 'primary' : 'textSecondary'}
                        >
                            {taskCreatorStore.repetition === T_REPETITION.ONCE && 'Single occurrence'}
                            {taskCreatorStore.repetition === T_REPETITION.LOOP && 'Repeat everyday'}
                        </Typography>
                    </Box> */}
                </Grid>
                <Grid item>
                    {/* <Button
                        rounded
                        size="small"
                        color="secondary"
                        className={classes.button}
                        onClick={openBoardsMenu}
                        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                        startIcon={
                            <FiberManualRecordIcon
                                style={{
                                    fontSize: 12,
                                    color: taskCreatorStore.project?.color ?? theme.palette.secondary.light
                                }}
                            />
                        }
                    >
                        {taskCreatorStore.project?.title ?? ''}
                    </Button> */}
                    <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => taskCreatorStore.setOpen(false)}
                        style={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            color: alpha(theme.palette.secondary.dark, 0.7)
                        }}
                    >
                        <CloseIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    );
});

export default TopActions;

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { TASK_CONTENT_TYPE as T_TYPE } from '../../../../Utils/constants';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import MoreHorizIcon from '@material-ui/icons/MoreVert';

import TitleInput from './TitleInput';
import TextBody from './TextBody';
import CheckList from './CheckList';
import taskCreatorStore from '../../TaskCreatorStore';

const useStyles = makeStyles((theme) => ({
    padded: {
        padding: theme.spacing(0, 3)
    }
}));

const index = observer(() => {
    const classes = useStyles();

    const titleRef = React.useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Focus title input when dialog is open
    React.useEffect(() => {
        const dispose = reaction(
            () => taskCreatorStore.open,
            (open) => {
                if (open) {
                    setTimeout(() => {
                        if (titleRef && titleRef.current) {
                            titleRef.current.focus();
                        }
                    }, 100);
                }
            }
        );
        return () => dispose();
    }, []);

    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleTaskTypeChange = (type: any) => () => {
        if (type === taskCreatorStore.taskType) return;
        taskCreatorStore.setTaskType(type);
    };

    const handleRepetitionChange = (repetition: string) => () => {
        if (repetition === taskCreatorStore.repetition) return;
        taskCreatorStore.setRepetition(repetition);
    };

    return (
        <React.Fragment>
            <Grid container item className={classes.padded} alignItems="center">
                <Box width={30}>
                    <IconButton color="secondary" size="small" onClick={handleOpenMenu}>
                        <MoreHorizIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                <Box flexGrow={1}>
                    <TitleInput inputRef={titleRef} />
                </Box>
            </Grid>

            <Grid container className={classes.padded} alignItems="center">
                {taskCreatorStore.taskType === T_TYPE.TEXT ? (
                    <TextBody />
                ) : taskCreatorStore.taskType === T_TYPE.CHECKLIST ? (
                    <CheckList />
                ) : null}
            </Grid>
        </React.Fragment>
    );
});

export default index;

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

import { alpha, darken } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from '../../../Button';
import taskCreatorStore from '../../TaskCreatorStore';

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.25, 0.5, 0.25, 0)
    }
}));

const TaskBottom = observer(() => {
    const classes = useStyles();

    const createTask = () => {
        const newTask = taskCreatorStore.createTask;
        console.log(newTask);
    };

    const handleDeleteTag = (id: any) => () => {
        taskCreatorStore.unassignGroup(id);
    };

    return (
        <Grid container direction="row" alignItems="flex-end" justify="space-between">
            <Grid item container alignItems="center" xs>
                {taskCreatorStore.groups.map((group) => (
                    <Chip
                        key={group.id}
                        size="small"
                        variant="outlined"
                        label={group.label}
                        className={classes.chip}
                        style={{
                            color: darken(group.color, 0.2),
                            borderColor: alpha(group.color, 0.6),
                            backgroundColor: alpha(group.color, 0.1)
                        }}
                        onDelete={handleDeleteTag(group.id)}
                        deleteIcon={<CancelIcon style={{ color: darken(group.color, 0.2) }} />}
                    />
                ))}
            </Grid>
            <Grid item xs={4} container justify="flex-end">
                <Button
                    rounded
                    variant="text"
                    color="secondary"
                    style={{ marginRight: 5 }}
                    onClick={() => {
                        taskCreatorStore.reset();
                        taskCreatorStore.setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button rounded onClick={createTask} disabled={!taskCreatorStore.isNewTaskValid}>
                    Save
                </Button>
            </Grid>
        </Grid>
    );
});

export default TaskBottom;

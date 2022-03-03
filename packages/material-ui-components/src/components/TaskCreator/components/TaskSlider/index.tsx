import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import TimeSlider from './TimeSlider';
import TimeSelector from './TimeSelector';

const useStyles = makeStyles((theme) => ({
    slider: {
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4.3),
        backgroundColor: 'rgba(0,0,0,.03)'
    },
    selector: {
        marginRight: theme.spacing(3.5)
    }
}));

const TaskSlider = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item xs={8}>
                <Box className={classes.slider}>
                    <Box py={2} pl={4.3} pr={4}>
                        <TimeSlider />
                    </Box>
                </Box>
            </Grid>
            <Grid item>
                <Box className={classes.selector}>
                    <TimeSelector />
                </Box>
            </Grid>
        </Grid>
    );
};

export default TaskSlider;

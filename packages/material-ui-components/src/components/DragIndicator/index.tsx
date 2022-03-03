import React from 'react';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

export const DragIndicator = withStyles((theme) => ({
    root: {
        color: theme.palette.grey[400],
        alignItems: 'center',
        position: 'relative',
        left: -5,
        display: 'flex'
    }
}))(({ classes, ...props }) => (
    <Box className={classes.root} {...props}>
        <DragIndicatorIcon color="inherit" style={{ fontSize: 16 }} />
    </Box>
));

export default DragIndicator;

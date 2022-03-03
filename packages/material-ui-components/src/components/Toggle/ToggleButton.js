import React from 'react';

import MuiToggleButton from '@material-ui/lab/ToggleButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const ToggleButton = withStyles((theme) => ({
    root: {
        fontSize: 12,
        flexGrow: 1,
        '&:active': {
            backgroundColor: fade(theme.palette.primary.main, 0.15)
        },
        '&:focus': {
            // boxShadow: `${fade(theme.palette.primary.main, 0.5)} 0 0 0 0.1rem`
        },
        '&$selected': {
            color: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.main, 0.2)
            }
        }
    },
    selected: {}
}))(MuiToggleButton);

export default ToggleButton;

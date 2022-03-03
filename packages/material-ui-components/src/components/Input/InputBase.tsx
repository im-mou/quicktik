import React from 'react';
import MuiInputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const qBaseInput = withStyles((theme) => ({
    root: {
        width: '100%'
    },
    input: {
        width: '100%',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.grey[200],
        border: `1px solid ${theme.palette.grey[300]}`,
        fontSize: 14,
        padding: '8px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            backgroundColor: theme.palette.common.white,
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main
        }
    }
}))(MuiInputBase);

export default qBaseInput;

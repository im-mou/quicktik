import React from 'react';
import MuiInputBase from '@material-ui/core/InputBase';

import { withStyles } from '@material-ui/core/styles';

const qNakedInput = withStyles((theme) => ({
    root: {
        width: '100%'
    },
    input: {
        width: '100%',
        borderRadius: 0,
        position: 'relative',
        fontSize: 14
    }
}))(MuiInputBase);

export default qNakedInput;

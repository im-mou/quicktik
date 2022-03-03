import React from 'react';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';

const qToggleGroup = withStyles((theme) => ({
    root: {
        flex: 'auto'
    },
    grouped: {
        border: '0 !important',
        // flexGrow: 1,
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius
        }
    },
    groupedHorizontal: {}
}))(ToggleButtonGroup);

const qToggleGroupMultiline = withStyles((theme) => ({
    root: {
        display: 'inline-block',
        '&$groupedHorizontal': {
            marginLeft: 0
        }
    },
    grouped: {
        border: 'inherit'
    },
    groupedHorizontal: {}
}))(ToggleButtonGroup);

export const ToggleGroup = qToggleGroup;
export const ToggleGroupMultiline = qToggleGroupMultiline;

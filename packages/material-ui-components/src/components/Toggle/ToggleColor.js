import React from 'react';

import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import DoneIcon from '@material-ui/icons/Done';

export const ToggleColorElement = withStyles((theme) => ({
    root: {
        width: 16,
        height: 16,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.circle': {
            borderRadius: 20,
            width: 18,
            height: 18,
            marginRight: 4,
            '&.checked': {
                border: 'none',
                backgroundColor: 'transparent'
            }
        }
    }
}))(({ classes, color, checked, circle, ...props }) => (
    <Box
        m={0.5}
        className={clsx(classes.root, { circle }, { checked })}
        border={`1px solid ${color}`}
        bgcolor={fade(color, 0.5)}
        {...props}
    >
        {checked ? circle ? <DoneIcon style={{ fontSize: 20, color }} /> : <DoneIcon style={{ fontSize: 14 }} /> : null}
    </Box>
));

const ToggleColor = withStyles((theme) => ({
    root: {
        color: '#fff',
        position: 'relative',
        background: 'transparent',
        border: `1px solid transparent`,
        borderRadius: '50px !important',
        '&:hover': {},
        '&$selected': {
            backgroundColor: 'transparent',
            borderColor: theme.palette.grey[300],
            '&:hover': {
                backgroundColor: theme.palette.grey[200]
            }
        }
    },
    selected: {}
}))(({ color, ...props }) => (
    <ToggleButton {...props}>
        <ToggleColorElement checked={props.selected} color={color} />
    </ToggleButton>
));

export default ToggleColor;

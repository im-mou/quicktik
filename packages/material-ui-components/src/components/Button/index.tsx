import React from 'react';
import clsx from 'clsx';

import MuiButton, { ButtonProps } from '@material-ui/core/Button';
import { alpha } from '@material-ui/core/styles';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        fontSize: 12,
        padding: '8px 12px'
    },
    primary: {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        '&:hover, &:active': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2)
        }
    },
    secondary: {
        color: theme.palette.secondary.dark,
        backgroundColor: alpha(theme.palette.secondary.light, 0.2),
        '&:hover, &:active': {
            backgroundColor: alpha(theme.palette.secondary.dark, 0.2)
        }
    },
    noBackground: {
        backgroundColor: 'transparent'
    },
    rounded: {
        borderRadius: 50
    }
}));

type TButton = Omit<ButtonProps, 'css'> & { rounded?: boolean };

const Button = React.forwardRef<any, TButton>(({ className, rounded, children, ...props }: TButton, ref) => {
    const classes = useStyles();
    return (
        <MuiButton
            className={clsx(
                { [classes.root]: props.size !== 'small' },
                classes[props.color || 'primary'],
                {
                    [classes.noBackground]: props.variant === 'outlined' || props.variant === 'text'
                },
                { [classes.rounded]: !!rounded },
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </MuiButton>
    );
});

export default Button;

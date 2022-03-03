import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import taskCreatorStore from '../../TaskCreatorStore';

const TitleInput = withStyles((theme) => ({
    root: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.palette.grey[800],
        padding: theme.spacing(1, 0)
    }
}))(
    observer((props: InputBaseProps) => {
        return (
            <InputBase
                fullWidth
                placeholder="Enter a title for this task..."
                value={taskCreatorStore.title}
                onChange={(e) => taskCreatorStore.setTitle(e.target.value)}
                {...props}
            />
        );
    })
);

export default TitleInput;

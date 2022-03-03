import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { observer } from 'mobx-react';
import taskCreatorStore from '../../TaskCreatorStore';

const TextBody = withStyles((theme) => ({
    root: {
        fontSize: 16,
        color: theme.palette.grey[600],
        marginLeft: theme.spacing(4) - 1
    }
}))(
    observer((props: any) => {
        return (
            <InputBase
                fullWidth
                multiline
                placeholder="Write something descriptive about this task..."
                value={taskCreatorStore.body}
                onChange={(e) => taskCreatorStore.setBody(e.target.value)}
                {...props}
            />
        );
    })
);

export default TextBody;

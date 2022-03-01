import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../core/store/RootStore'

const TextBody = withStyles((theme) => ({
  root: {
    fontSize: 16,
    color: theme.palette.grey[600],
    marginLeft: theme.spacing(4) - 1
  }
}))(
  observer((props) => {
    const { TaskCreatorStore } = useStore()
    return (
      <InputBase
        fullWidth
        multiline
        placeholder='Write something descriptive about this task...'
        value={TaskCreatorStore.body}
        onChange={(e) => TaskCreatorStore.setBody(e.target.value)}
        {...props}
      />
    )
  })
)

export default TextBody

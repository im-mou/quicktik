import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../core/store/RootStore'

import InputBase from '@material-ui/core/InputBase'

const TitleInput = withStyles((theme) => ({
  root: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.grey[800],
    padding: theme.spacing(1, 0)
  }
}))(
  observer((props) => {
    const { TaskCreatorStore } = useStore()
    return (
      <InputBase
        fullWidth
        placeholder='Enter a title for this task...'
        value={TaskCreatorStore.title}
        onChange={(e) => TaskCreatorStore.setTitle(e.target.value)}
        {...props}
      />
    )
  })
)

export default TitleInput

import React from 'react'

import { observer } from 'mobx-react-lite'
import { useStore } from '../../core/store/RootStore'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'

import TopActions from './components/TopActions'
import TaskBody from './components/TaskBody'
import TaskSlider from './components/TaskSlider'
import TaskBottom from './components/TaskBottom'

const useStyles = makeStyles((theme) => ({
  padded: {
    padding: theme.spacing(0, 3)
  },
  paper: {
    top: `5%`,
    width: 620,
    borderRadius: 10,
    padding: theme.spacing(3, 0)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  modal: {
    alignItems: 'flex-start'
  },
  backdrop: {
    backgroundColor: fade('#ded8ac', 0.1)
  }
}))

const TaskCreator = observer(() => {
  const { TaskCreatorStore } = useStore()
  const classes = useStyles()

  return (
    <Dialog
      keepMounted
      maxWidth={false}
      classes={{ container: classes.modal }}
      open={TaskCreatorStore.open}
      onClose={() => TaskCreatorStore.setOpen(false)}
      PaperProps={{ classes: { root: classes.paper } }}
      BackdropProps={{ classes: { root: classes.backdrop } }}
      TransitionComponent={Grow}
    >
      <Grid container>
        <Box width={1} className={classes.padded}>
          <TopActions />
        </Box>

        <Box width={1} py={3}>
          <TaskBody />
        </Box>

        <Grid container item>
          <TaskSlider />
        </Grid>

        <Box width={1} pt={2}>
          <Grid container item className={classes.padded}>
            <TaskBottom />
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  )
})

export default TaskCreator

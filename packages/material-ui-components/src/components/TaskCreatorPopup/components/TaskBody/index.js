import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../core/store/RootStore'
import {
  TASK_CONTENT_TYPE as T_TYPE,
  TASK_REPETITION as T_REPETITION
} from '../../../../core/Utils/constants'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import Menu from '../../../../components/Menu'
import ListSubheader from '../../../../components/Menu/ListSubheader'
import MenuItem from '../../../../components/Menu/MenuItem'
import Divider from '../../../../components/Divider'

import MoreHorizIcon from '@material-ui/icons/MoreVert'
import NotesRoundedIcon from '@material-ui/icons/NotesRounded'
import TimelineIcon from '@material-ui/icons/Timeline'
import LoopIcon from '@material-ui/icons/Loop'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

import TitleInput from './TitleInput'
import TextBody from './TextBody'
import CheckList from './CheckList'

const useStyles = makeStyles((theme) => ({
  padded: {
    padding: theme.spacing(0, 3)
  }
}))

const index = observer(() => {
  const classes = useStyles()
  const { TaskCreatorStore } = useStore()

  const titleRef = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Focus title input when dialog is open
  React.useEffect(() => {
    const dispose = reaction(
      () => TaskCreatorStore.open,
      (open) => {
        if (open) {
          setTimeout(() => titleRef.current.focus(), 100)
        }
      }
    )
    return () => dispose()
  }, [])

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleTaskTypeChange = (type) => () => {
    if (type === TaskCreatorStore.taskType) return
    TaskCreatorStore.setTaskType(type)
  }

  const handleRepetitionChange = (repetition) => () => {
    if (repetition === TaskCreatorStore.repetition) return
    TaskCreatorStore.setRepetition(repetition)
  }

  return (
    <>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        width={220}
      >
        <ListSubheader disableGutters>Select task type</ListSubheader>
        <MenuItem
          label='Text'
          icon={<NotesRoundedIcon />}
          onClick={handleTaskTypeChange(T_TYPE.TEXT)}
          checked={TaskCreatorStore.taskType === T_TYPE.TEXT}
        />

        <MenuItem
          label='Milestones'
          icon={<TimelineIcon />}
          onClick={handleTaskTypeChange(T_TYPE.CHECKLIST)}
          checked={TaskCreatorStore.taskType === T_TYPE.CHECKLIST}
        />

        <Divider />
        <ListSubheader disableGutters>Task Repetition</ListSubheader>

        <MenuItem
          label='Single occurrence'
          icon={<TrendingFlatIcon />}
          onClick={handleRepetitionChange(T_REPETITION.ONCE)}
          checked={TaskCreatorStore.repetition === T_REPETITION.ONCE}
        />
        <MenuItem
          label='Repeat everyday'
          icon={<LoopIcon />}
          onClick={handleRepetitionChange(T_REPETITION.LOOP)}
          checked={TaskCreatorStore.repetition === T_REPETITION.LOOP}
        />
      </Menu>

      <Grid container item className={classes.padded} alignItems='center'>
        <Box width={30}>
          <IconButton
            variant='contained'
            color='secondary'
            size='small'
            onClick={handleOpenMenu}
          >
            <MoreHorizIcon fontSize='inherit' />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <TitleInput inputRef={titleRef} />
        </Box>
      </Grid>

      <Grid container className={classes.padded} alignItems='center'>
        {TaskCreatorStore.taskType === T_TYPE.TEXT ? (
          <TextBody />
        ) : TaskCreatorStore.taskType === T_TYPE.CHECKLIST ? (
          <CheckList />
        ) : null}
      </Grid>
    </>
  )
})

export default index

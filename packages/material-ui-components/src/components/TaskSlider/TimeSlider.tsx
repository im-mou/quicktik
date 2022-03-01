import React from 'react'

// import theme from '../../../../core/theme';
// import { useStore } from '../../../../core/store/RootStore';

import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const ThumbBoxShadow = `0 3px 10px ${fade('#acbed1', 0.15)}`
const ThumbBoxShadowHover = `0 3px 15px ${fade('#acbed1', 0.15)}`

const CustomSlider = withStyles((theme) => ({
  root: {
    height: 2,
    // padding: '15px 0',
    margin: 0
  },
  thumb: {
    height: 26,
    width: 54,
    borderRadius: 50,
    backgroundColor: '#acbed1',
    boxShadow: ThumbBoxShadow,
    marginTop: -10,
    marginLeft: -26,
    '&:focus, &:hover, &$active': {
      boxShadow: ThumbBoxShadowHover,
      '@media (hover: none)': {
        boxShadow: ThumbBoxShadow
      }
    },
    '&:focus': {
      boxShadow: `${fade('#acbed1', 0.25)} 0 0 0 0.2rem`
    },
    '&::after': {
      borderRadius: 0,
      content: '',
      height: 20,
      width: 1,
      backgroundColor: '#acbed1',
      left: 'calc(50% - 1px)',
      top: 26
    }
  },
  active: {},
  valueLabel: {
    // left: 'calc(50% - 24px)',
    left: '18%',
    top: 'calc(50% - 6px)',
    '& *': {
      background: 'transparent',
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold'
    }
  },
  track: {
    height: 2
  },
  rail: {
    display: 'none'
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: 28
  },
  markActive: {
    opacity: 1
  },
  markLabel: {
    top: 7,
    fontSize: 12,
    color: theme.palette.grey[500],
    fontWeight: 'bold'
  }
}))(Slider)

const marks = [
  { label: '0min', value: 0 },
  { label: '15min', value: 15 },
  { label: '30min', value: 30 },
  { label: '45min', value: 45 },
  { label: '1h', value: 60 }
]

const TimeSlider = () => {
  // const { TaskCreatorStore } = useStore();
  return (
    <CustomSlider
      min={0}
      max={55}
      step={5}
      marks={marks}
      track={false}
      defaultValue={marks[1].value}
      valueLabelDisplay='on'
      // onChangeCommitted={(e, v) => TaskCreatorStore.setMinutes(v)}
      // @ts-ignore
      scale={(val) => (val < 60 ? `${val}min` : '1h')}
    />
  )
}

export default TimeSlider

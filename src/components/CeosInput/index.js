import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
// import LabelInput from '../LabelInput'

const StyledInput = withStyles({
  root: {
    '& .MuiFilledInput-root:not(.MuiInputBase-multiline)': {
      height: 50
    },
    '& .MuiFilledInput-root:not(.Mui-disabled)': {
      backgroundColor: '#fafafa'
    },
    '& .Mui-disabled': {
      backgroundColor: '#f0f0f0'
    }
  }
})(TextField)

const CeosInput = ({ onChange, converter, required, label, helper, simple, ...props }) => {
  const [value, setValue] = useState(!props.value ? '' : props.value)
  // const [timeoutValue, setTimeoutValue] = useState(null)

  const onChangeInput = event => {
    // todo: add converter if needed
    // if (converter) {
    //   setValue(converter(event.target.value))
    //   return
    // }
    setValue(event.target.value)
  }

  useEffect(() => setValue(!props.value ? '' : props.value), [props.value])

  // todo: add timeout for suggestion
  // useEffect(() => {
  //   if (timeoutValue) {
  //     clearTimeout(timeoutValue)
  //   }
  //
  //   if (!simple) {
  //     setTimeoutValue(setTimeout(() => onChange && onChange(props.id || props.name, value), 500))
  //   } else {
  //     onChange(props.id || props.name, value)
  //   }
  // }, [value])

  return (
    <StyledInput
      {...props}
      onChange={onChangeInput}
      value={value}
      label={label}
      // add label if needed
      // label={<LabelInput required={required} label={label} helper={helper} />}
    />
  )
}

CeosInput.propTypes = {
  onChange: PropTypes.func,
  // converter: PropTypes.func,
  label: PropTypes.node,
  required: PropTypes.bool,
  // add helper if needed
  // helper: PropTypes.object
}

export default CeosInput

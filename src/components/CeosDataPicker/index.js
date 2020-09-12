import React from 'react'
import { withStyles } from '@material-ui/core'
import { KeyboardDateTimePicker, KeyboardDatePicker, DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import LabelInput from '../LabelInput'

const StyledDate = {
  root: {
    '& .MuiFilledInput-root:not(.MuiInputBase-multiline)': {
      height: 50
    },
    '& .MuiFilledInput-root:not(.Mui-disabled)': {
      backgroundColor: '#fafafa'
    },
    '& .Mui-disabled': {
      backgroundColor: '#f0f0f0',
      '& .MuiFilledInput-input': {
        padding: 0,
        marginTop: 20,
        marginLeft: 10,
        color: 'rgba(56, 68, 89, 0.87)'
      }
    },
    '& .MuiFormLabel-root': {
      '& .MuiInputLabel-asterisk': {
        color: 'red',
        position: 'absolute',
        fontSize: 22,
        top: 0,
        right: -13
      }
    }
  }
}

const CeosDateTimePickerComponent = withStyles(StyledDate)(KeyboardDateTimePicker)
const CeosDatePickerComponent = withStyles(StyledDate)(KeyboardDatePicker)
const CeosDatePickerCom = withStyles(StyledDate)(DatePicker)

export default function CeosDatePicker(props) {
  const {
    ampm,
    label,
    required,
    value,
    onChange,
    error,
    disabled,
    disablePast,
    disableFuture,
    format,
    mask,
    onlydate,
    maxDate,
    minDate,
    helper,
    datepicker,
    views,
    onBlur
  } = props

  function renderLabel(date) {
    if (moment(date).isValid()) {
      if (onlydate)
        return moment(date).format(format || 'DD/MM/YYYY')
      else
        return moment(date).format(format || 'DD/MM/YYYY HH:mm')
    }
    return ''
  }

  if (onlydate) {
    return (
      <CeosDatePickerComponent
        variant="inline"
        disabled={!!disabled}
        style={{ marginTop: 8, width: '100%' }}
        ampm={!!ampm}
        label={<LabelInput required={required} label={label} helper={helper} />}
        value={value}
        onChange={onChange}
        error={error}
        disablePast={!!disablePast}
        disableFuture={!!disableFuture}
        mask={mask || '__/__/____ __:__'}
        labelFunc={renderLabel}
        invalidDateMessage={disabled ? '' : 'Data inválida'}
        maxDateMessage={''}
        minDateMessage={''}
        inputVariant={'filled'}
        format={format || 'DD/MM/YYYY HH:mm'}
        maxDate={maxDate}
        minDate={minDate}
        autoOk
      />
    )
  }

  if (datepicker) {
    return (
      <CeosDatePickerCom
        views={views}
        variant="inline"
        disabled={!!disabled}
        style={{ marginTop: 8, width: '100%' }}
        ampm={!!ampm}
        label={<LabelInput required={required} label={label} helper={helper} />}
        value={value}
        onChange={onChange}
        error={error}
        disablePast={!!disablePast}
        disableFuture={!!disableFuture}
        mask={mask || '__/__/____ __:__'}
        labelFunc={renderLabel}
        invalidDateMessage={disabled ? '' : 'Data inválida'}
        maxDateMessage={''}
        minDateMessage={''}
        inputVariant={'filled'}
        format={format || 'DD/MM/YYYY HH:mm'}
        maxDate={maxDate}
        minDate={minDate}
        autoOk
        InputAdornmentProps={{ position: 'end' }}
      />
    )
  }
  return (
    <CeosDateTimePickerComponent
      variant="inline"
      disabled={!!disabled}
      style={{ marginTop: 8, width: '100%' }}
      ampm={false}
      label={<LabelInput required={required} label={label} helper={helper} />}
      value={value}
      onChange={onChange}
      error={error}
      disablePast={!!disablePast}
      disableFuture={!!disableFuture}
      mask={mask || '__/__/____ __:__'}
      labelFunc={renderLabel}
      invalidDateMessage={disabled ? '' : 'Data inválida'}
      maxDateMessage={''}
      onBlur={onBlur}
      minDateMessage={''}
      inputVariant={'filled'}
      format={format || 'DD/MM/YYYY HH:mm'}
      maxDate={maxDate}
      minDate={minDate}
      autoOk
    />
  )
}

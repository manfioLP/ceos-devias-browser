import React from 'react'
import Select from 'react-select'
import * as _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { MenuItem, Paper, Typography } from '@material-ui/core'
import CeosInput from '../CeosInput'

const useStyles = makeStyles(theme => ({
  input: {
    display: 'flex !important',
    padding: '0px !important',
    height: '50px !important'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: theme.spacing(2.5),
    marginLeft: theme.spacing(1.5),
    alignItems: 'center',
    overflow: 'hidden'
  },
  singleValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  paper: {
    position: 'absolute',
    zIndex: 99999,
    marginTop: theme.spacing(1),
    left: 0,
    minWidth: '100%'
  }
}))

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      Sem opções
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  const classes = useStyles()

  const {
    children,
    innerProps,
    innerRef,
    selectProps: { TextFieldProps }
  } = props

  return (
    <CeosInput
      fullWidth
      variant={'filled'}
      InputProps={{
        inputComponent,
        inputProps: {
          ...innerProps,
          className: classes.input,
          ref: innerRef,
          children
        }
      }}
      {...TextFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  Option,
  SingleValue,
  ValueContainer,
  NoOptionsMessage
}

export default function IntegrationReactSelect(props) {
  const classes = useStyles()

  const {
    toShow,
    value,
    id,
    name,
    label,
    error,
    disabled,
    margin,
    handleChange,
    onBlur,
    required,
    multiple,
    input
  } = props

  // TODO: get options from a file instead of props
  const options = ['opcao1', 'opcao2', 'opcao3', 'Outro'];

  const suggestions = () => {
    const list = [
      ..._.map(options, suggestion => {
        return {
          label: suggestion,
          value: suggestion
        }
      })
    ]
    //if (hasSelecione) {
    // list.unshift({
    //   label: 'Nenhum',
    //   value: null
    // })
    //}
    return list
  }

  const selected = !value
    ? {
      label: '',
      value: {}
    }
    : _.assign({
      label: value,
      value: value
    })

  return (
    <div>
      <Select
        multiple={multiple}
        input={input}
        classes={classes}
        id={id}
        isDisabled={!!disabled}
        name={name}
        TextFieldProps={{
          label,
          required,
          InputLabelProps: { shrink: true },
          error: error,
          disabled: disabled,
          margin: margin
        }}
        options={suggestions()}
        placeholder={' '}
        autosize={true}
        components={components}
        value={selected}
        onChange={event => {
          _.assign(event, {
            target: {
              name: name,
              value: event.value
            }
          })
          handleChange(event)
        }}
        onBlur={event => {
          _.assign(event, {
            target: {
              name: name,
              value: value
            }
          })
          if (onBlur) {
            onBlur(event)
          }
        }}
      />
    </div>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const CustomButton = withStyles(theme => ({
  root: {
    fontSize: 12,
    height: 48
  },
  outlinedSecondary: {
    '&:hover': {
      border: '1px solid rgba(245, 0, 87, 0.5)'
    }
  }
}))(Button)

export const CeosButton = props => {
  const {
    label,
    onClick,
    disabled,
    color,
    variant,
    style,
    fullWidth,
    className,
    endIcon,
    startIcon,
    type,
  } = props

  return (
    <CustomButton
      style={style ? style : null}
      className={className ? className : null}
      disabled={!!disabled}
      color={color ? color : 'primary'}
      variant={variant ? variant : 'outlined'}
      fullWidth={!!fullWidth}
      onClick={onClick}
      starticon={startIcon ? startIcon : null}
      endicon={endIcon ? endIcon : null}
      type={type}
    >
      {label}
    </CustomButton>
  )
}

CeosButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  variant: PropTypes.string,
}

export default CeosButton

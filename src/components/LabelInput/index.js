import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { red } from '@material-ui/core/colors'
import Label from '../Label'
import Span from '../Span'

const StyledLabel = styled(props => <Label {...props} />)`
  display: flex;
  align-items: center;
  color: ${props => props.titleColor};
`

const StyledSpan = styled(props => <Span {...props} />)`
  font-size: 14px;
  color: ${red[500]};
`

const LabelInput = ({ label, required, titleColor }) => {

  return (
    <StyledLabel titleColor={titleColor}>
      {label}
      {required && <StyledSpan>*</StyledSpan>}
    </StyledLabel>
  )
}

LabelInput.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
}

export default LabelInput

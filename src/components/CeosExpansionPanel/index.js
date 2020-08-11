import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as _ from 'lodash'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import Div from '../Div'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import LabelInput from '../LabelInput'
// import colors from '../../theme/appTheme'

const colors = {
  palette: {
    primary: {
      light: '#B6DDDA',
      main: '#01877E',
      dark: '#191970'
    }
  }
}

const StyledExpansionPanel = styled(ExpansionPanel)`
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  background-color: white !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
`

const StyledDiv = styled(props => <Div {...props} />)`
  ${props => (props.hidden ? 'display: none !important;' : 'width: 100% !important;')}
`

const StyledTypography = styled(props => <Typography {...props} />)`
  color: ${colors.palette.primary.main} !important;
  font-size: 14px !important;
  font-weight: bold !important;
`

const CeosExpansionPanel = ({ title, children, name, expanded, disabled, hidden, helper, titleColor }) => {
  const id = _.camelCase(name)

  return (
    <StyledDiv hidden={hidden}>
      <StyledExpansionPanel defaultExpanded={!!expanded} disabled={!!disabled}>
        {title && (
          <ExpansionPanelSummary
            expandIcon={disabled ? null : <ExpandMoreIcon color="primary" />}
            aria-controls={id}
            id={id}
          >
            <StyledTypography>
              {/*<LabelInput label={title} helper={helper} titleColor={titleColor} />*/}
              <label> {title} </label>
            </StyledTypography>
          </ExpansionPanelSummary>
        )}
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </StyledExpansionPanel>
    </StyledDiv>
  )
}

CeosExpansionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  helper: PropTypes.object
}

export default CeosExpansionPanel

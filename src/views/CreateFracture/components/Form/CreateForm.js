import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import withFormik from './index.formik'

import { Grid, Tooltip, Paper } from '@material-ui/core'

import CeosInput from '../../../../components/CeosInput'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CreateForm = props => {
  // todo: add other props
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper>
      this is kind of a identification form
      <Grid container spacing={2} justify={'space-between'}>
        <Grid item xs={3}>
          <CeosInput
            id="bone"
            name="bone"
            label="Osso Acometido"
            value=""
            onChange={window.alert('Mudou!')}
            // error="error no campo de osso"
            margin="dense"
            // variant="filled"
            // rows={'1'}
            // multiline
            // rowsMax={'10'}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <CeosInput
            id="region"
            name="region"
            label="Região topográfica"
            value=""
            onChange={window.alert('Mudou regiao topografica!')}
            // error="error no campo de regiao"
            fullWidth />
        </Grid>

        <Grid item xs={3}>
          <CeosInput
            id="limb"
            name="limb"
            label="Membro Acometido"
            value=""
            onChange={window.alert('Mudou membro!')}
            // error="error no campo de membro"
            fullWidth />
        </Grid>

        <Grid item xs={3}>
          <CeosInput
            id="firstSurgicalApproach"
            name="firstSurgicalApproach"
            label="Primeira abordagem Cirurgica"
            value=""
            onChange={window.alert('Mudou primeira abordagem cirurgica!!')}
            // error="error no campo de primeira abordagem cirurgica"
            fullWidth />
        </Grid>
      </Grid>
      now this is kind of the form panel
      <form>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            talvez a data aqui?
          </Grid>
          <Grid item xs={3}>
            outra parada aqui (ainda eh grid3)
          </Grid>
          <Grid item xs={3}>
            outra parada aqui (ainda eh grid3)
          </Grid>

          <Grid item xs={6}>
            agora o grid eh 6
          </Grid>
          <Grid item xs={6}>
            agora o grid eh 6
          </Grid>

          <Grid item xs={12}>
            agora eh um grid12
          </Grid>
        </Grid>
      </form>
    </Paper>
)
}

CreateForm.propTypes = {
  className: PropTypes.string,
  // todo: add proptyhpes here
  // product: PropTypes.object.isRequired
};

export default withFormik(CreateForm)
// export default withStyles(styles)(withRouter(withFormik(Pgi)))


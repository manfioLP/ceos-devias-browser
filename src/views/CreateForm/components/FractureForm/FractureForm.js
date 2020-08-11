import React, { Fragment, useEffect } from 'react'
import withFormik from './formik/index.formik'
import { withStyles } from '@material-ui/styles'
import { FormControlLabel, Switch, Paper, Grid, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'

// import styles from '../EquipmentForm.style'

// import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import CeosButton from '../../../../components/CeosButton'
import CeosInput from '../../../../components/CeosInput'
import PropTypes from "prop-types";
import CeosSelectInput from '../../../../components/CeosSelectInput'

// based on Engie/src/components/Pgi/Cadastro/Equipment/EquipmentForm

const FractureForm = props => {

  // retrieve from props from formik
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,

    setFieldValue
  } = props

  // const handleSubmit = () => {
  //   window.alert('not implemented!')
  // }

  // Descrição censo: digitar
  // Osso acometido
  // Mecanismo
  // Região topográfica
  // Membro acometido
  // Classificação ao
  // Classificação gustillo
  // Numero de fraturas expostas
  // Lesões associadas diretamente ao trauma
  // Primeira abordagem Cirurgica
  // Amputação

  // TODO: Add multiple select to firstSurgicalApproach and associatedTraumaInjury
  // TODO: Add boolean checkbox for amputation
  // todo: add <form>
  return (
    <Paper>
      <Typography variant={'h4'}>Informação da Fratura</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={6}>
            <CeosInput
              id="description"
              name="description"
              toShow={'description'}
              // onBlur={handleBlur}
              value={values.census}
              label="Descrição Censo"
            />
          </Grid>
          <Grid item xs={6}>
            <CeosSelectInput
              id="bone"
              name="bone"
              toShow={'bone'}
              onBlur={handleBlur}
              value={values.bone}
              label="Osso Acometido"
              handleChange={handleChange}
            />
            {/*<CeosInput disabled label="Outro"/>*/}
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="mechanism"
              name="mechanism"
              toShow="mechanism"
              value={values.mechanism}
              label="Mecanismo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="region"
              name="region"
              toShow="region"
              value={values.region}
              label="Região topográfica"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="limb"
              name="limb"
              toShow="limb"
              value={values.limb}
              label="Membro acometido"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="ao"
              name="ao"
              toShow="ao"
              value={values.ao}
              label="Classificação ao"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="gustillo"
              name="gustillo"
              toShow="gustillo"
              value={values.gustillo}
              label="Classificação Gustillo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="associatedTraumaInjury"
              name="associatedTraumaInjury"
              toShow="associatedTraumaInjury"
              value={values.associatedTraumaInjury}
              label="Lesões associadas diretamente ao trauma"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="firstSurgicalApproach"
              name="firstSurgicalApproach"
              toShow="firstSurgicalApproach"
              value={values.firstSurgicalApproach}
              label="Primeira abordagem Cirurgica"
              handleChange={handleChange}
            />
          </Grid>
          <CeosButton
            variant="contained"
            // className={classes.buttonSuccess}
            type={'submit'}
            label={'Salvar'}
            onClick={() => toast.success('Fratura adicionada!')}
            // disabled={isDisableFields}
          />
        </Grid>
      </form>
    </Paper>
  )

}

FractureForm.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object
  // product: PropTypes.object.isRequired
};

export default withFormik(FractureForm)
// export default withStyles(styles)(withRouter(withFormik(FractureForm)))

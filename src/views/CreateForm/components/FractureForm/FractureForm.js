import React, {Fragment, useEffect, useState} from 'react'
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

  const [showMechanismOther, setShowMechanismOther] = useState(!values.mechanism && values.mechanism === 'Outro')
  const [showLimbOther, setShowLimbOther] = useState(!values.limb && values.limb === 'Outro')
  const [showBoneOther, setShowBoneOther] = useState(!values.bone && values.bone === 'Outro')

  useEffect( () => {
    if (values.mechanism === 'Outro') {
      setShowMechanismOther(true)
    } else {
      setShowMechanismOther(false)
    }
  }, [values.mechanism, values.limb])

  useEffect( () => {
    if (values.limb === 'Outro') {
      setShowLimbOther(true)
    } else {
      setShowLimbOther(false)
    }
  }, [values.limb])

  useEffect( () => {
    if (values.bone === 'Outro') {
      setShowBoneOther(true)
    } else {
      setShowBoneOther(false)
    }
  }, [values.bone])

  // verify lesoes associadas ao trauma
  // useEffect( () => {
  //   if (values.limb === 'Outro') {
  //     setShowLimbOther(true)
  //   } else {
  //     setShowLimbOther(false)
  //   }
  // }, [values.limb])
  //
  // useEffect( () => {
  //   if (values.limb === 'Outro') {
  //     setShowLimbOther(true)
  //   } else {
  //     setShowLimbOther(false)
  //   }
  // }, [values.limb])

  // let showMechanismOther = !values.mechanism && values.mechanism === 'opcao3'
  // console.log(showMechanismOther)


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
          <Grid item xs={3}>
            <CeosSelectInput
              id="bone"
              name="bone"
              toShow={'bone'}
              onBlur={handleBlur}
              value={values.bone}
              label="Osso Acometido"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="boneOther"
              name="boneOther"
              toShow="boneOther"
              value={values.bone}
              label="Outro"
              handleChange={handleChange}
              value={showBoneOther ? `${values.boneOther ? values.boneOther : ''}` : null}
              disabled={!showBoneOther}
              label="Outro"/>
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
            <CeosInput
              id="mechanismOther"
              name="mechanismOther"
              toShow="mechanismOther"
              value={values.mechanism}
              label="Outro"
              handleChange={handleChange}
              value={showMechanismOther ? `${values.mechanismOther ? values.mechanismOther : ''}` : null}
              disabled={!showMechanismOther}
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
            <CeosInput
              id="limbOther"
              name="limbOther"
              toShow="limbOther"
              value={values.limb}
              label="Outro"
              handleChange={handleChange}
              value={showLimbOther ? `${values.limbOther ? values.limbOther : ''}` : null}
              disabled={!showLimbOther}
              label="Outro"/>
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

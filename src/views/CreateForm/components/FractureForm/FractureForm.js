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
  console.log('values...', values)

  const [showMechanismOther, setShowMechanismOther] = useState(!values.mechanism && values.mechanism === 'Outro');
  const [showLimbOther, setShowLimbOther] = useState(!values.limb && values.limb === 'Outro');
  const [showBoneOther, setShowBoneOther] = useState(!values.bone && values.bone === 'Outro');
  const [showTraumaInjuryOther, setShowTraumaInjuryOther] = useState(!values.associatedTraumaInjury && values.associatedTraumaInjury === 'Outro');
  const [showSurgicalApproachOther, setShowSurgicalApproachOther] = useState(!values.firstSurgicalApproach && values.firstSurgicalApproach === 'Outro');

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

  useEffect( () => {
    if (values.associatedTraumaInjury === 'Outro') {
      setShowTraumaInjuryOther(true)
    } else {
      setShowTraumaInjuryOther(false)
    }
  }, [values.associatedTraumaInjury])

  useEffect( () => {
    if (values.firstSurgicalApproach === 'Outro') {
      setShowSurgicalApproachOther(true)
    } else {
      setShowSurgicalApproachOther(false)
    }
  }, [values.firstSurgicalApproach])

  return (
    <Paper>
      <Typography variant={'h4'}>Informação da Fratura</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={6}>
            <CeosInput
              id="description"
              name="description"
              toshow={'description'}
              // onBlur={handleBlur}
              value={values.census}
              label="Descrição Censo"
            />
          </Grid>
          <Grid item xs={6}>
            <CeosSelectInput
              id="region"
              name="region"
              toshow="region"
              value={values.region}
              label="Região topográfica"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="bone"
              name="bone"
              toshow={'bone'}
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
              toshow="boneOther"
              value={values.bone}
              label="Outro"
              // handleChange={handleChange}
              value={showBoneOther ? `${values.boneOther ? values.boneOther : ''}` : null}
              disabled={!showBoneOther}
              label="Outro"/>
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="mechanism"
              name="mechanism"
              toshow="mechanism"
              value={values.mechanism}
              label="Mecanismo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="mechanismOther"
              name="mechanismOther"
              toshow="mechanismOther"
              value={values.mechanism}
              label="Outro"
              // handleChange={handleChange}
              value={showMechanismOther ? `${values.mechanismOther ? values.mechanismOther : ''}` : null}
              disabled={!showMechanismOther}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="limb"
              name="limb"
              toshow="limb"
              value={values.limb}
              label="Membro acometido"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="limbOther"
              name="limbOther"
              toshow="limbOther"
              value={values.limb}
              label="Outro"
              // handleChange={handleChange}
              value={showLimbOther ? `${values.limbOther ? values.limbOther : ''}` : null}
              disabled={!showLimbOther}
              label="Outro"/>
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="associatedTraumaInjury"
              name="associatedTraumaInjury"
              toshow="associatedTraumaInjury"
              value={values.associatedTraumaInjury}
              label="Lesões associadas diretamente a fratura exposta"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="associatedTraumaInjuryOther"
              name="associatedTraumaInjuryOther"
              toshow="associatedTraumaInjuryOther"
              value={values.associatedTraumaInjury}
              label="Lesões associadas diretamente a fratura exposta"
              handleChange={handleChange}
              value={showTraumaInjuryOther ? `${values.associatedTraumaInjuryOther ? values.associatedTraumaInjuryOther : ''}` : null}
              disabled={!showTraumaInjuryOther}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="firstSurgicalApproach"
              name="firstSurgicalApproach"
              toshow="firstSurgicalApproach"
              value={values.firstSurgicalApproach}
              label="Primeira abordagem Cirurgica"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosInput
              id="firstSurgicalApproachOther"
              name="firstSurgicalApproachOther"
              toshow="firstSurgicalApproachOther"
              value={values.firstSurgicalApproach}
              label="Outro"
              // handleChange={handleChange}
              value={showSurgicalApproachOther ? `${values.firstSurgicalApproachOther ? values.firstSurgicalApproachOther : ''}` : null}
              disabled={!showSurgicalApproachOther}
            />
          </Grid>
          <Grid item xs={2}>
            <CeosSelectInput
              id="gustillo"
              name="gustillo"
              toshow="gustillo"
              value={values.gustillo}
              label="Classificação Gustillo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CeosSelectInput
              id="ao"
              name="ao"
              toshow="ao"
              value={values.ao}
              label="Classificação ao"
              handleChange={handleChange}
            />
          </Grid>
          <CeosButton
            variant="contained"
            // className={classes.buttonSuccess}
            // type={'submit'}
            label={'Salvar'}
            onClick={() => {
              // newFracture();
              window.alert('salvo no forms')
              console.log('values...', values)
            }
            }
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

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import withFormik from './formik/index.formik'

import {Grid, Paper, Typography} from '@material-ui/core'

import CeosInput from '../../../../components/CeosInput'
import CeosExpansionPanel from "../../../../components/CeosExpansionPanel";
import CeosSelectInput from "../../../../components/CeosSelectInput";
import {toast} from "react-toastify";
import CeosButton from "../../../../components/CeosButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Switch from "@material-ui/core/Switch";



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PatientForm = props => {
  // todo: add other props
  // todo: add formik
  const {
    className,
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    patient,
    addPatient,
    ...rest } = props;

  const classes = useStyles();

  const [showCityOther, setShowCityOther] = useState(false);
  const [showCivilStatusOther, setShowCivilStatusOther] = useState(false);
  const [showProfessionOther, setShowProfessionOther] = useState(false);

  useEffect( () => {
    const compareString = values.city ? values.city.slice(4, values.city.length) : ''
    if (compareString === 'Outro') {
      setShowCityOther(true)
    } else {
      setShowCityOther(false)
    }
  }, [values.city]);

  useEffect( () => {
    const compareString = values.civilStatus ? values.civilStatus.slice(4, values.civilStatus.length) : ''
    if (compareString === 'Outro') {
      setShowCivilStatusOther(true)
    } else {
      setShowCivilStatusOther(false)
    }
  }, [values.civilStatus]);

  useEffect( () => {
    const compareString = values.profession ? values.profession.slice(4, values.profession.length) : ''

    if (compareString === 'Outro') {
      setShowProfessionOther(true)
    } else {
      setShowProfessionOther(false)
    }
  }, [values.profession]);

  const [boolState, setBoolState] = React.useState({
    educationCompleted: false,
    diabetes: false,
    smoker: false,
    ethylista: false,
    infection: false,
    amputation: false,
    comorbidities: false,
    has: false
  });

  const handleSwitchChange = (name, switchValue) => {
    setFieldValue(name, switchValue)
    setBoolState({ ...boolState, [name]: switchValue })
  }

  // TODO: add dates
  return (
    <Paper>
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <CeosInput
                id="recordNumber"
                name="recordNumber"
                toShow={'recordNumber'}
                // onblur={handleBur}
                value={values.recordNumber}
                label="Numero de Prontuario"
              />
            </Grid>
            <Grid item xs={4}>
              <CeosInput
                id="name"
                name="name"
                toShow={'name'}
                // onblur={handleBur}
                value={values.name}
                label="Nome"
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="age"
                name="age"
                toShow={'age'}
                // onblur={handleBur}
                value={values.age}
                label="Idade"
              />
            </Grid>
            <Grid item xs={3}>
              <CeosSelectInput
                id="gender"
                name="gender"
                toShow="gender"
                value={values.gender}
                label="Sexo"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosSelectInput
                id="profession"
                name="profession"
                toShow={'profession'}
                // onblur={handleBur}
                handleChange={handleChange}
                value={values.profession}
                label="Profissao"
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="professionOther"
                name="professionOther"
                toshow="professionOther"
                value={values.profession}
                label="Outro"
                value={showProfessionOther ? `${values.professionOther ? values.professionOther : ''}` : null}
                disabled={!showProfessionOther}
                label="Outro"/>
            </Grid>
            <Grid item xs={3}>
              <CeosSelectInput
                id="civilStatus"
                name="civilStatus"
                toShow="civilStatus"
                value={values.civilStatus}
                label="Estado Civil"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="civilStatusOther"
                name="civilStatusOther"
                toshow="civilStatusOther"
                value={values.civilStatus}
                label="Outro"
                // handleChange={handleChange}
                value={showCivilStatusOther ? `${values.civilStatusOther ? values.civilStatusOther : ''}` : null}
                disabled={!showCivilStatusOther}
                label="Outro"/>
            </Grid>
            <Grid item xs={3}>
              <CeosSelectInput
                id="education"
                name="education"
                toShow="education"
                value={values.education}
                label="Escolaridade"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="exposureTime"
                name="exposureTime"
                toShow={'exposureTime'}
                // onblur={handleBur}
                value={values.exposureTime}
                label="Tempo de Exposição"
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="hour"
                name="hour"
                toShow={'hour'}
                // onblur={handleBur}
                value={values.hour}
                label="Horário de admissão"
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="time"
                name="time"
                toShow={'time'}
                // onblur={handleBur}
                value={values.time}
                label="Tempo Médio de Internação"
              />
            </Grid>
            <Grid item xs={4}>
              <CeosSelectInput
                id="city"
                name="city"
                toShow="city"
                value={values.city}
                label="Procedencia"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="cityOther"
                name="cityOther"
                toshow="cityOther"
                value={values.city}
                label="Outro"
                // handleChange={handleChange}
                value={showCityOther ? `${values.cityOther ? values.cityOther : ''}` : null}
                disabled={!showCityOther}
                label="Outro"/>
            </Grid>
            <Grid item xs={4}>
              <CeosInput
                id="antibiotic"
                name="antibiotic"
                toShow={'antibiotic'}
                // onblur={handleBur}
                value={values.antibiotic}
                label="Antibiótico na Emergência"
              />
            </Grid>
            <Grid item xs={5}>
              <CeosInput
                id="comorbities"
                name="comorbities"
                toShow={'comorbities'}
                // onblur={handleBur}
                value={values.comorbities}
                label="Comorbidades"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="amputation"
                    onChange={event => handleSwitchChange('amputation', event.target.checked)}
                    checked={ boolState.amputation }
                    color="primary"
                  />
                }
                label="Amputado"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="comorbidities"
                    onChange={event => handleSwitchChange('comorbidities', event.target.checked)}
                    checked={ boolState.comorbidities }
                    color="primary"
                  />
                }
                label="Comorbidades"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="diabetes"
                    onChange={event => handleSwitchChange('diabetes', event.target.checked)}
                    checked={ boolState.diabetes }
                    color="primary"
                  />
                }
                label="Diabetes"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="educationCompleted"
                    onChange={event => handleSwitchChange('educationCompleted', event.target.checked)}
                    checked={ boolState.educationCompleted }
                    color="primary"
                  />
                }
                label="Educacao Completa"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="ethylista"
                    onChange={event => handleSwitchChange('ethylista', event.target.checked)}
                    checked={ boolState.ethylista }
                    color="primary"
                  />
                }
                label="Etilista"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="has"
                    onChange={event => handleSwitchChange('has', event.target.checked)}

                    checked={ boolState.has }
                    color="primary"
                  />
                }
                label="Hipertensao Arterial"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="smoker"
                    onChange={event => handleSwitchChange('smoker', event.target.checked)}
                    checked={ boolState.smoker }
                    color="primary"
                  />
                }
                label="Fumante"
              />
            </Grid>
            <Grid item xs={2} className={classes.checkboxView}>
              <FormControlLabel
                control={
                  <Switch
                    checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                    style={{ margin: 0 }}
                    name="infection"
                    onChange={event => handleSwitchChange('infection', event.target.checked)}
                    checked={ boolState.infection }
                    color="primary"
                  />
                }
                label="Infeccao"
              />
            </Grid>
            <CeosButton
              variant="contained"
              // className={classes.buttonSuccess}
              type={'submit'}
              label={'Salvar Paciente'}
              onClick={() => console.log('Pacient added!', values)}
              // disabled={isDisableFields}
            />
          </Grid>
      </form>
    </Paper>
  )
}

PatientForm.propTypes = {
  className: PropTypes.string,
  // todo: add proptyhpes here
  // product: PropTypes.object.isRequired
};

// export default PatientForm
export default withFormik(PatientForm)
// export default withStyles(styles)(withRouter(withFormik(Pgi)))


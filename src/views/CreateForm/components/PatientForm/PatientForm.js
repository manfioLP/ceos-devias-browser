import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import withFormik from './formik/index.formik'

import {Grid, Paper, Typography} from '@material-ui/core'

import CeosInput from '../../../../components/CeosInput'
import CeosExpansionPanel from "../../../../components/CeosExpansionPanel";
import CeosSelectInput from "../../../../components/CeosSelectInput";
import CeosButton from "../../../../components/CeosButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Switch from "@material-ui/core/Switch";
import CeosDatePicker from "../../../../components/CeosDataPicker";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import getOptionsToDisplay from "../../../../components/CeosSelectInput/utils/getOptionsToDisplay";



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
  const { history } = props;

  const classes = useStyles();

  const [traumas, setTraumas] = useState([]);
  const [showCityOther, setShowCityOther] = useState(false);
  const [showCivilStatusOther, setShowCivilStatusOther] = useState(false);
  const [showProfessionOther, setShowProfessionOther] = useState(false);
  const [showAssociatedTraumaInjuryOther, setShowAssociatedTraumaInjuryOther] = useState(false);
  const [showClosedFractureDescription, setShowClosedFractureDescription] = useState(Boolean(values.associatedClosedFractureDescription));

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

  useEffect( () => {
    let traumaOther = false;
    let closedFracture = false;

    for (const trauma of traumas) {
      const compareString = trauma.slice(4, trauma.length).trim();
      if (compareString === 'Outro')
        traumaOther = true;
      if (compareString === 'Fratura fechada')
        closedFracture = true;
    }
    setShowAssociatedTraumaInjuryOther(traumaOther);
    setShowClosedFractureDescription(closedFracture);
  }, [traumas]);

  const [boolState, setBoolState] = React.useState({
    educationCompleted: false,
    diabetes: false,
    smoker: false,
    ethylista: false,
    infection: false,
    death: false,
    comorbidities: false,
    has: false
  });

  const handleSwitchChange = (name, switchValue) => {
    setFieldValue(name, switchValue)
    setBoolState({ ...boolState, [name]: switchValue })
  }

  const handleDatePickerChange = (date, name) => {
    setFieldValue(name, date)
  }

  if (!values.date) {
    values.date = moment();
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange2 = (event) => {
    console.log('event...', event.target.value)
    setTraumas(event.target.value);
    values.traumas = event.target.value;
  };

  const options = getOptionsToDisplay('associatedTraumaInjury');

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CeosDatePicker
                label={'Data'}
                required
                value={values.date}
                onChange={date => handleDatePickerChange(date, 'date')}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="weekday"
                name="weekday"
                toShow={'weekday'}
                value={values.weekday}
                label="Dia da Semana"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="month"
                name="month"
                toShow="month"
                value={values.month}
                label="Mes"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="name"
                name="name"
                toShow={'name'}
                // onblur={handleBur}
                value={values.name}
                label="Nome"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="recordNumber"
                name="recordNumber"
                toShow={'recordNumber'}
                // onblur={handleBur}
                value={values.recordNumber}
                label="Numero de Prontuario"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="age"
                name="age"
                toShow={'age'}
                value={values.age}
                label="Idade"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="ageCategory"
                name="ageCategory"
                toShow={'ageCategory'}
                value={values.ageCategory}
                label="Categorizar Idade"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="exposureTime"
                name="exposureTime"
                toShow={'exposureTime'}
                // onblur={handleBur}
                value={values.exposureTime}
                label="Tempo de Exposição"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="exposureTimeCategory"
                name="exposureTimeCategory"
                toShow={'exposureTimeCategory'}
                // onblur={handleBur}
                value={values.exposureTimeCategory}
                label="Categorizar Tempo de Exposição"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="hour"
                name="hour"
                toShow={'hour'}
                // onblur={handleBur}
                value={values.hour}
                label="Horário de admissão"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="admissionHourCategory"
                name="admissionHourCategory"
                toShow={'admissionHourCategory'}
                // onblur={handleBur}
                value={values.admissionHourCategory}
                label="Categorizar Horário de admissão"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="gender"
                name="gender"
                toShow="gender"
                value={values.gender}
                label="Sexo"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="race"
                name="race"
                toShow="race"
                value={values.race}
                label="Raça"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
              <CeosInput
                id="professionOther"
                name="professionOther"
                toshow="professionOther"
                value={values.profession}
                label="Outro"
                value={showProfessionOther ? `${values.professionOther ? values.professionOther : ''}` : null}
                disabled={!showProfessionOther}
                label="Outro"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosSelectInput
                id="civilStatus"
                name="civilStatus"
                toShow="civilStatus"
                value={values.civilStatus}
                label="Estado Civil"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="civilStatusOther"
                name="civilStatusOther"
                toshow="civilStatusOther"
                value={values.civilStatus}
                label="Outro"
                value={showCivilStatusOther ? `${values.civilStatusOther ? values.civilStatusOther : ''}` : null}
                disabled={!showCivilStatusOther}
                label="Outro"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={3}>
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
                value={showCityOther ? `${values.cityOther ? values.cityOther : ''}` : null}
                disabled={!showCityOther}
                onChange={setFieldValue}
                label="Outro"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl} style={{width: 300}}>
                <InputLabel id="demo-mutiple-chip-label">Lesões associadas ao trauma</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={traumas}
                  onChange={handleChange2}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => {
                        return (
                          <Chip key={value} label={value} className={classes} />
                        )})}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {options.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="associatedTraumaInjuryOther"
                name="associatedTraumaInjuryOther"
                toshow="associatedTraumaInjuryOther"
                value={values.associatedTraumaInjury}
                label="Outro"
                value={showAssociatedTraumaInjuryOther ? `${values.associatedTraumaInjuryOther ? values.associatedTraumaInjuryOther : ''}` : null}
                disabled={!showAssociatedTraumaInjuryOther}
                onChange={setFieldValue}
                label="Outro"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={2}>
              <CeosInput
                id="associatedClosedFractureDescription"
                name="associatedClosedFractureDescription"
                toshow="associatedClosedFractureDescription"
                value={showClosedFractureDescription ? values.associatedClosedFractureDescription ? values.associatedClosedFractureDescription : '' : null}
                label="Descricao fratura fechada"
                handleChange={handleChange}
                disabled={!showClosedFractureDescription}
                onChange={setFieldValue}
              />
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
            <Grid item xs={2}>
              <CeosInput
                id="hospitalizationAverageTime"
                name="hospitalizationAverageTime"
                toShow={'hospitalizationAverageTime'}
                // onblur={handleBur}
                value={values.hospitalizationAverageTime}
                label="Tempo Médio de Internação"
                onChange={setFieldValue}
              />
            </Grid>
            <Grid item xs={3}>
              <CeosInput
                id="antibiotic"
                name="antibiotic"
                toShow={'antibiotic'}
                value={values.antibiotic}
                onChange={setFieldValue}
                label="Antibiótico na Emergência"
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
            <Grid item xs={2}>
              <CeosInput
                id="otherComorbidities"
                name="otherComorbidities"
                toShow={'otherComorbidities'}
                onChange={setFieldValue}
                value={values.otherComorbidities}
                label="Comorbidades"
                disabled={!values.comorbidities}
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
                    name="death"
                    onChange={event => handleSwitchChange('death', event.target.checked)}
                    checked={ boolState.death }
                    color="primary"
                  />
                }
                label="Óbito"
              />
            </Grid>
            <CeosButton
              variant="contained"
              // className={classes.buttonSuccess}
              patient={patient}
              type={'submit'}
              label={'Salvar Paciente'}
              onClick={() => {
                console.log('Pacient added!', values)
                // todo: add register/patientId
                // history.push(`/register/${patient.identifier}`)
              }}
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


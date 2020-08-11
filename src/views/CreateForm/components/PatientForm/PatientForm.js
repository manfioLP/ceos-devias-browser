import React from 'react';
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
  const { className, values, handleChange, setFieldValue, handleSubmit, ...rest } = props;

  const classes = useStyles();

  // BANCO PACIENTE
  // Data (em numeral): digitar (xx/xx/xxxx)
  // Dia da semana:seg/terça/quarta/quinta/sexta/sab/domingo
  // Mês: jan/fevereiro/março/abril/maio/junho/julho/agosto/set/out/nov
  // Lesões associadas ao trauma: fratura fechada (opção de digitar qual osso)/lesão abdominal/lesão torácica/lesão cranioencefálica/lesão bucomaxilo/lesão cutânea/outro -> nisso aq tem q ter uma opção q de p assinalar mais de uma opção

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
  // Etilista: sim/não
  // Comorbidades: sim/não
  // Diabetes : sim/não
  // Hipertensão arterial: sim/não
  // Tabagista: sim/não
  // Infecção: sim/não
  // Amputação: sim/não
  return (
    <Paper>
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CeosInput
                id="recordNumber"
                name="recordNumber"
                toShow={'recordNumber'}
                // onblur={handleBur}
                value={values.recordNumber}
                label="Numero de Prontuario"
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
              />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={5}>
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
            <Grid item xs={5}>
              <CeosInput
                id="profession"
                name="profession"
                toShow={'profession'}
                // onblur={handleBur}
                value={values.profession}
                label="Profissao"
              />
            </Grid>
            <Grid item xs={4}>
              <CeosSelectInput
                id="gender"
                name="gender"
                toShow="gender"
                value={values.gender}
                label="Sexo"
                handleChange={handleChange}
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
            <Grid item xs={4}>
              <CeosSelectInput
                id="degreeLevel"
                name="degreeLevel"
                toShow="degreeLevel"
                value={values.degreeLevel}
                label="Escolaridade"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <CeosSelectInput
                id="civilStatus"
                name="civilStatus"
                toShow="civilStatus"
                value={values.civilStatus}
                label="Estado Civil"
                handleChange={handleChange}
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
              onClick={() => toast.success('Paciente adicionado!')}
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


import React, { useState, useEffect, useContext } from 'react'
import Paper from "@material-ui/core/Paper";
import Div from '../../components/Div'
// import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
// import { withStyles } from '@material-ui/core/styles'
// import { withRouter } from 'react-router-dom'
// import { toast } from 'react-toastify'

import _ from 'lodash';
import { PatientForm, FractureRegister } from './components'
import PatientRegister from "./components/PatientRegister/PatientRegister";
import {makeStyles} from "@material-ui/styles";

import { FractureProvider } from "../../contexts/Fracture";
import { PatientContext } from "../../contexts/Patient";

import CeosButton from "../../components/CeosButton";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const CreateForm = (props) => {

  const classes = useStyles();

  const {patientState, getPatientById} = useContext(PatientContext);
  const [patient, setPatient] = patientState;
  const { history } = props;
  const { id } = props.match.params;

  useEffect(()=> {
    console.log('props no create form...', props)
    if (props.patient && props.patient._id) {
      console.log('Paciente ainda ta no estado!!!')
    } else {
      console.log('Paciente resetado!!!');
      setPatient({identifier: null});
    }
  }, [])

  useEffect(() => {
    if (_.isNil(patient.identifier) && !_.isNil(id)) {
      getPatientById(id)
      // get fractures
    }
  }, [id])


  return (
    <div className={classes.root}>
      <Paper>
        <PatientRegister history={history} {...patient}/>
          {patient.identifier && <FractureRegister patient={patient}/>}
          {/* <FractureRegister patient={patient}/> */}
      </Paper>
    </div>
  )
}

export default CreateForm;

import React, {useState, useEffect, useRef, useContext} from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow }from '@material-ui/core/index'
import * as _ from 'lodash'

// import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper/index'
import Typography from '@material-ui/core/Typography/index'
import Portal from '@material-ui/core/Portal/index'

import PatientForm from '../PatientForm'

import CeosButton from '../../../../components/CeosButton'
import CeosExpansionPanel from '../../../../components/CeosExpansionPanel'
import Grid from "@material-ui/core/Grid";

import { PatientContext } from "../../../../contexts/Patient";


// TODO: use classes
const classes = {
  selectedColor: {},
  table: {},
  tableWrapper: {},
  button: {}
}

const PatientRegister = (props) => {

  // todo: retrieve info from props here
  const {patientState, addPatient} = useContext(PatientContext)
  const [patient, setPatient] = patientState;


  return (
    <CeosExpansionPanel title={'Dados do Paciente'} name={'patient'}>
      <Paper>
        <PatientForm
          {...props}
          patient={patient}
          addPatient={addPatient}
        />

      </Paper>

    </CeosExpansionPanel>
  )
};

export default PatientRegister
// export default withStyles(styles)(FractureRegister)

import React, { useState, useEffect, useContext } from 'react'
import Paper from "@material-ui/core/Paper";
import Div from '../../components/Div'
// import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
// import { withStyles } from '@material-ui/core/styles'
// import { withRouter } from 'react-router-dom'
// import { toast } from 'react-toastify'

import { PatientForm, FractureRegister } from './components'
import PatientRegister from "./components/PatientRegister/PatientRegister";







const CreateForm = (props) => {

  // const {patient} = props
  const patient = {

  }

  return (
    <Div>
      <Paper>
        <PatientRegister />
        <FractureRegister />
      </Paper>
    </Div>
  )
}

export default CreateForm;

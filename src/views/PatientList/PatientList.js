import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import { PatientsToolbar, PatientsTable } from './components';
import mockData from './data';

import { PatientContext } from "../../contexts/Patient";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PatientList = (props) => {
  const classes = useStyles();

  const [patients] = useState(mockData);
  const { history } = props;

  console.log('list props', props)
  console.log(history)
  console.log('patients', patients)
  return (
    <div className={classes.root}>
      <PatientsToolbar history={history}/>
      <div className={classes.content}>
        <PatientsTable history={history} />
      </div>
    </div>
  );
};

export default PatientList;

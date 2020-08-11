import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PatientsToolbar, PatientsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PatientList = () => {
  const classes = useStyles();

  const [patients] = useState(mockData);

  console.log('patients', patients)
  return (
    <div className={classes.root}>
      <PatientsToolbar />
      <div className={classes.content}>
        <PatientsTable patients={patients} />
      </div>
    </div>
  );
};

export default PatientList;

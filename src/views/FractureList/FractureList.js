import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { FracturesToolbar, FracturesTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FractureList = () => {
  const classes = useStyles();

  const [fractures] = useState(mockData);

  return (
    <div className={classes.root}>
      <FracturesToolbar />
      <div className={classes.content}>
        <FracturesTable fractures={fractures} />
      </div>
    </div>
  );
};

export default FractureList;

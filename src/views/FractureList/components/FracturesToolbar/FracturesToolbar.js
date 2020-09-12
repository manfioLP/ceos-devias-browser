import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

import { FractureContext } from "../../../../contexts/Fracture";
import CeosButton from "../../../../components/CeosButton";
import {PatientContext} from "../../../../contexts/Patient";

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const FracturesToolbar = props => {
  const { className, ...rest } = props;

  const { exportFractures } = useContext(FractureContext);

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Importar [NOT WORKING]</Button>
        <Button className={classes.exportButton}>Exportar [NOT WORKING]</Button>
        <CeosButton
          label={'EXPORTAR'}
          variant="contained"
          // className={classes.buttonSuccess}
          type={'submit'}
          onClick={(event) => {
            console.log('event...', event)
            console.log('clicou!')
            exportFractures();
          }}
        />
        <Button
          color="primary"
          variant="contained"
        >
          Adicionar fratura
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Procurar fratura"
        />
      </div>
    </div>
  );
};

FracturesToolbar.propTypes = {
  className: PropTypes.string
};

export default FracturesToolbar;

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

import { PatientContext } from "../../../../contexts/Patient";
import CeosButton from "../../../../components/CeosButton";

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

const PatientsToolbar = props => {
  const { className, ...rest } = props;

  const { exportPatients } = useContext(PatientContext);
  console.log('exportPatients...', exportPatients);

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Importar [NOT WORKING]</Button>
        <Button className={classes.exportButton} onCLick={()=> {
          console.log('clicou!!!')
          exportPatients();
        }}>Exportar [NOT WORKING]</Button>
        <CeosButton
          label={'EXPORTAR'}
          variant="contained"
          // className={classes.buttonSuccess}
          type={'submit'}
          onClick={(event) => {
            console.log('event...', event)
            console.log('clicou!')
            exportPatients();
          }}
        />
        <Button
          color="primary"
          variant="contained"
        >
          Adicionar paciente
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Procurar paciente"
        />
      </div>
    </div>
  );
};

PatientsToolbar.propTypes = {
  className: PropTypes.string
};

export default PatientsToolbar;

import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';
import {PatientContext} from "../../../../contexts/Patient";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PatientsTable = props => {
  const { className, history, ...rest } = props;

  const {getPatients} = useContext(PatientContext);

  const classes = useStyles();

  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  console.log('entrou na pagina')
  useEffect(() => {
    console.log('ta no effect')
    const requestedPatients = getPatients(page, rowsPerPage, setPatients);
    console.log(requestedPatients)
  }, [page])

  const handleSelectAll = event => {
    const { patients } = props;

    let selectedPatients;

    if (event.target.checked) {
      selectedPatients = patients.map(user => user.id);
    } else {
      selectedPatients = [];
    }

    setSelectedPatients(selectedPatients);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPatients.indexOf(id);
    let newSelectedPatients = [];

    if (selectedIndex === -1) {
      newSelectedPatients = newSelectedPatients.concat(selectedPatients, id);
    } else if (selectedIndex === 0) {
      newSelectedPatients = newSelectedPatients.concat(selectedPatients.slice(1));
    } else if (selectedIndex === selectedPatients.length - 1) {
      newSelectedPatients = newSelectedPatients.concat(selectedPatients.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPatients = newSelectedPatients.concat(
        selectedPatients.slice(0, selectedIndex),
        selectedPatients.slice(selectedIndex + 1)
      );
    }

    setSelectedPatients(newSelectedPatients);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPatients.length === patients.length}
                      color="primary"
                      indeterminate={
                        selectedPatients.length > 0 &&
                        selectedPatients.length < patients.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Lesões associadas ao trauma</TableCell>
                  <TableCell>Procedência</TableCell>
                  <TableCell>Tempo de exposição</TableCell>
                  <TableCell>Data de registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.slice(0, rowsPerPage).map(patient => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={patient.id}
                    selected={selectedPatients.indexOf(patient.id) !== -1}
                    onDoubleClick={() => {
                      console.log(patient)
                      history.push(`/register/${patient._id}`)
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedPatients.indexOf(patient.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, patient.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{patient.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Typography> {patient.associatedTraumaInjury} </Typography>
                    </TableCell>
                    <TableCell>
                      {patient.city}
                    </TableCell>
                    <TableCell>{patient.exposureTime}</TableCell>
                    <TableCell>
                      {moment(patient.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={100}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

PatientsTable.propTypes = {
  className: PropTypes.string,
};

export default PatientsTable;

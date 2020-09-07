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

import {FractureContext} from "../../../../contexts/Fracture";

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

const FracturesTable = props => {
  const { className, ...rest } = props;

  const {getFractures} = useContext(FractureContext);

  const classes = useStyles();

  const [fractures, setFractures] = useState([]);
  const [selectedFractures, setSelectedFractures] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  console.log('entrou na pagina')
  useEffect(() => {
    console.log('ta no effect')
    const requestedFractures = getFractures(page, rowsPerPage, setFractures);
    console.log(requestedFractures)
  }, [page])

  const handleSelectAll = event => {
    const { fractures } = props;

    let selectedFractures;

    if (event.target.checked) {
      selectedFractures = fractures.map(fracture => fracture.id);
    } else {
      selectedFractures = [];
    }

    setSelectedFractures(selectedFractures);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFractures.indexOf(id);
    let newSelectedFractures = [];

    if (selectedIndex === -1) {
      newSelectedFractures = newSelectedFractures.concat(selectedFractures, id);
    } else if (selectedIndex === 0) {
      newSelectedFractures = newSelectedFractures.concat(selectedFractures.slice(1));
    } else if (selectedIndex === selectedFractures.length - 1) {
      newSelectedFractures = newSelectedFractures.concat(selectedFractures.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFractures = newSelectedFractures.concat(
        selectedFractures.slice(0, selectedIndex),
        selectedFractures.slice(selectedIndex + 1)
      );
    }

    setSelectedFractures(newSelectedFractures);
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
                      checked={selectedFractures.length === fractures.length}
                      color="primary"
                      indeterminate={
                        selectedFractures.length > 0 &&
                        selectedFractures.length < fractures.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Prontuário</TableCell>
                  <TableCell>Região Anatômica Acometida</TableCell>
                  <TableCell>Osso</TableCell>
                  <TableCell>Primeira Abordagem Cirurgica</TableCell>
                  <TableCell>Data de registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fractures.slice(0, rowsPerPage).map(fracture => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={fracture.id}
                    selected={selectedFractures.indexOf(fracture.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedFractures.indexOf(fracture.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, fracture.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      {fracture.recordNumber}
                    </TableCell>
                    <TableCell>
                      <Typography> {fracture.region} </Typography>
                    </TableCell>
                    <TableCell>
                      {fracture.bone}
                    </TableCell>
                    <TableCell>{fracture.firstSurgicalApproach}</TableCell>
                    <TableCell>
                      {moment(fracture.createdAt).format('DD/MM/YYYY')}
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

FracturesTable.propTypes = {
  className: PropTypes.string,
  fractures: PropTypes.array.isRequired
};

export default FracturesTable;

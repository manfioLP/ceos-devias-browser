import React, { useState, useEffect, useContext, useRef } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow }from '@material-ui/core/index'
import * as _ from 'lodash'

import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper/index'
import Typography from '@material-ui/core/Typography/index'
import Portal from '@material-ui/core/Portal/index'
import Grid from "@material-ui/core/Grid";


import FractureForm from '../FractureForm'
import { FractureContext } from "../../../../contexts/Fracture";

import CeosButton from '../../../../components/CeosButton'
import CeosExpansionPanel from '../../../../components/CeosExpansionPanel'
// TODO: use classes

const classes = {
  selectedColor: {},
  table: {},
  tableWrapper: {
    maxHeight: 256,
    overflow: 'auto',
    width: '100%'
},
  button: {},
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: 16
  }
}

const FractureRegister = (props) => {
  const {selected, contextRows, addFracture} = useContext(FractureContext);
// const [selectedId, setSelectedId] = useState(null);
  const [selectedId, setSelectedId] = selected;
  // const [rows, setRows] = useState([]);
  const [rows, setRows] = contextRows;

  const [showPortal, setShowPortal] = useState();
  const container = React.useRef(null);

  // todo: retrieve info from props here
  const {
    fractures, // retrieved from patient context
    patient
  } = props;

  // todo: load fractures with useEffect( ... , [])

  useEffect(() => {
    console.log('fractures effect...')
    console.log(fractures)
    if (!_.isNil(fractures)) {
      setRows(fractures)
    }
  }, [fractures]);

  const newFracture = () => {
    const newRows = rows;
    newRows.push({
      description: '',
      region: '',
      bone: '',
      limb: '',
      mechanism: '',
      associatedTraumaInjury: '',
      firstSurgicalApproach: '',
      gustillo: '',
      ao: ''
    })

    setRows(newRows)
    setSelectedId(newRows.length - 1)
  };

  const showPortalFunc = index => {
    console.log('show Portal func...')
    console.log(index, showPortal)
    console.log('selected...', selectedId)
    setSelectedId(index)
    setShowPortal(
      selectedId !== index && showPortal === false
        ? true
        : selectedId !== index && showPortal === true
        ? true
        : selectedId === index && showPortal === true
          ? false
          : selectedId === index && showPortal === false
    )
  };

  const renderTableBody = () => {
    return rows.map((row, index) => (
      <TableRow
        selected={selectedId === index}
        key={index}
        hover
        onClick={event => showPortalFunc(index)}
        className={selectedId === index ? classes.selectedColor : null}
      >
        <TableCell align="center">{row.bone}</TableCell>
        <TableCell align="center">{row.limb}</TableCell>
        <TableCell align="center">{row.firstSurgicalApproach}</TableCell>
        <TableCell align="center">{row.amputated ? 'SIM' : 'NAO'}</TableCell>
      </TableRow>
    ))
    // })
  };

  const renderFractureForm = index => {
    const fracture = rows[index]
    console.log(index)
    console.log('fracture...', fracture)

    // if ((isLoading || _.isNil(equipment)) && !_.isEmpty(unidadeDeMedida)) {
    //   return <Loading />
    // }

    return (
      <FractureForm
        {...fracture}
        fracture={fracture}
        patient={patient}
        setShowPortal={setShowPortal}
        setRows={setRows}
        rows={rows}
        addFracture={addFracture}
        selectedId={selectedId}
        // setSelectedId={setSelectedId}
      />
    )
  };

  return (
    <CeosExpansionPanel title={'Fraturas'} name={'fracture'}>
      <Grid
        item
        lg={8}
        md={12}
        xl={12}
        xs={12}
      >
        <Badge badgeContent={rows.length} color="error" />
        <Paper style={{marginBottom: 30}}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Osso</TableCell>
                <TableCell align="center">Membro</TableCell>
                <TableCell align="center">Primeira Abordagem Cirurgica</TableCell>
                <TableCell align="center">Amputacao</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableBody()}
            </TableBody>
          </Table>
        </div>

        <div style={{ width: '100%', textAlign: 'center', margin: '1vh' }}>
        </div>

        <CeosButton
          color={'primary'}
          // disabled={_.isEmpty(installation) || isDisableFields || loadingPgi || isLoading}
          variant={'outlined'}
          className={classes.button}
          onClick={()=> {
            newFracture();
            setShowPortal(true);
          }}
          label='Nova Fratura'
        />
      </Paper>

      {showPortal ? <Portal container={container.current}> {renderFractureForm(selectedId)} </Portal> : null}
      <div ref={container}>
      </div>

      </Grid>
      {/*</div>*/}
    </CeosExpansionPanel>
  )
};

export default FractureRegister
// export default withStyles(styles)(FractureRegister)

import React, {Fragment, useContext, useEffect, useState} from 'react'
import withFormik from './formik/index.formik'
import {makeStyles, withStyles} from '@material-ui/styles'
import { FormControlLabel, Switch, Paper, Grid, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'

// import styles from '../EquipmentForm.style'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import CeosButton from '../../../../components/CeosButton'
import CeosInput from '../../../../components/CeosInput'
import PropTypes from "prop-types";
import CeosSelectInput from '../../../../components/CeosSelectInput'

import { FractureContext } from "../../../../contexts/Fracture";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FractureForm = props => {

  // retrieve from props from formik
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    patient,
    fracture,
    setShowPortal,
    addFracture,
  } = props;

  const classes = useStyles();

  const {selected, contextRows} = useContext(FractureContext);
// const [selectedId, setSelectedId] = useState(null);
  const [selectedId, setSelectedId] = selected;
  // const [rows, setRows] = useState([]);
  const [rows, setRows] = contextRows;

  const [showMechanismOther, setShowMechanismOther] = useState(!values.mechanism && values.mechanism === 'Outro');
  const [showLimbOther, setShowLimbOther] = useState(!values.limb && values.limb === 'Outro');
  const [showBoneOther, setShowBoneOther] = useState(!values.bone && values.bone === 'Outro');
  const [showTraumaInjuryOther, setShowTraumaInjuryOther] = useState(!values.associatedTraumaInjury && values.associatedTraumaInjury === 'Outro');
  const [showSurgicalApproachOther, setShowSurgicalApproachOther] = useState(!values.firstSurgicalApproach && values.firstSurgicalApproach === 'Outro');

  useEffect(() => {
  }, [fracture])
  useEffect( () => {
    const compareString = values.mechanism ? (values.mechanism.slice(4, values.mechanism.length)).trim() : '';
    if (compareString === 'Outro') {
      setShowMechanismOther(true)
    } else {
      setShowMechanismOther(false)
    }
  }, [values.mechanism]);

  useEffect( () => {
    const compareString = values.limb ? (values.limb.slice(4, values.limb.length)).trim() : '';
    if (compareString === 'Outro') {
      setShowLimbOther(true)
    } else {
      setShowLimbOther(false)
    }
  }, [values.limb]);

  useEffect( () => {
    const compareString = values.bone ? (values.bone.slice(4, values.bone.length)).trim() : '';
    if (compareString === 'Outro') {
      setShowBoneOther(true)
    } else {
      setShowBoneOther(false)
    }
  }, [values.bone]);

  useEffect( () => {
    const compareString = values.associatedTraumaInjury ? (values.associatedTraumaInjury.slice(4, values.associatedTraumaInjury.length)).trim() : '';
    if (compareString === 'Outro') {
      setShowTraumaInjuryOther(true)
    } else {
      setShowTraumaInjuryOther(false)
    }
  }, [values.associatedTraumaInjury])

  useEffect( () => {
    const compareString = values.firstSurgicalApproach ? (values.firstSurgicalApproach.slice(4, values.firstSurgicalApproach.length)).trim() : '';
    if (compareString === 'Outro') {
      setShowSurgicalApproachOther(true)
    } else {
      setShowSurgicalApproachOther(false)
    }
  }, [values.firstSurgicalApproach])

  const [boolState, setBoolState] = React.useState({
    infection: false,
    amputation: false,
  });

  const handleSwitchChange = (name, switchValue) => {
    setFieldValue(name, switchValue);
    setBoolState({ ...boolState, [name]: switchValue });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ['1', '2', '3', '4'];
  const testTrauma = [];
  const handleChange2 = (event) => {
    setTraumas(event.target.value);
  };

  const [traumas, setTraumas]= useState([])
  return (
    <Paper>
      <Typography variant={'h4'}>Informação da Fratura</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={traumas}
                onChange={handleChange2}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => {
                      console.log('selected...', value)
                      return (
                      <Chip key={value} label={value} className={classes} />
                    )})}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <CeosInput
              id="description"
              name="description"
              toshow={'description'}
              // onBlur={handleBlur}
              value={values.census}
              label="Descrição Censo"
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={6}>
            <CeosSelectInput
              id="region"
              name="region"
              toshow="region"
              value={values.region}
              label="Região Anatômica Acometida"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="bone"
              name="bone"
              toshow={'bone'}
              onBlur={handleBlur}
              value={values.bone}
              label="Osso Acometido"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="boneOther"
              name="boneOther"
              toshow="boneOther"
              label="Outro"
              value={showBoneOther ? `${values.boneOther ? values.boneOther : ''}` : null}
              disabled={!showBoneOther}
              label="Outro"
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="mechanism"
              name="mechanism"
              toshow="mechanism"
              value={values.mechanism}
              label="Mecanismo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="mechanismOther"
              name="mechanismOther"
              toshow="mechanismOther"
              value={values.mechanism}
              label="Outro"
              // handleChange={handleChange}
              value={showMechanismOther ? `${values.mechanismOther ? values.mechanismOther : ''}` : null}
              disabled={!showMechanismOther}
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="limb"
              name="limb"
              toshow="limb"
              value={values.limb}
              label="Membro acometido"
              handleChange={handleChange}
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="limbOther"
              name="limbOther"
              toshow="limbOther"
              label="Outro"
              // handleChange={handleChange}
              value={showLimbOther ? `${values.limbOther ? values.limbOther : ''}` : null}
              disabled={!showLimbOther}
              label="Outro"
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosSelectInput
              id="associatedFractureTraumaInjury"
              name="associatedFractureTraumaInjury"
              toshow="associatedFractureTraumaInjury"
              value={values.associatedFractureTraumaInjury}
              label="Lesões associadas diretamente a fratura exposta"
              handleChange={handleChange}
              onChange={handleChange}
              multiple
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes} />
                  ))}
                </div>
              )}
              // input={<Input id="select-multiple-chip" />}
            />
          </Grid>
          <Grid item xs={3}>
            <CeosInput
              id="associatedTraumaInjuryOther"
              name="associatedTraumaInjuryOther"
              toshow="associatedTraumaInjuryOther"
              value={showTraumaInjuryOther ? values.associatedTraumaInjuryOther ? values.associatedTraumaInjuryOther : '' : null}
              label="Lesões associadas diretamente a fratura exposta"
              handleChange={handleChange}
              value={showTraumaInjuryOther ? `${values.associatedTraumaInjuryOther ? values.associatedTraumaInjuryOther : ''}` : null}
              disabled={!showTraumaInjuryOther}
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosSelectInput
              id="firstSurgicalApproach"
              name="firstSurgicalApproach"
              toshow="firstSurgicalApproach"
              value={values.firstSurgicalApproach}
              label="Primeira abordagem Cirurgica"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CeosInput
              id="firstSurgicalApproachOther"
              name="firstSurgicalApproachOther"
              toshow="firstSurgicalApproachOther"
              value={values.firstSurgicalApproach}
              label="Outro"
              // handleChange={handleChange}
              value={showSurgicalApproachOther ? `${values.firstSurgicalApproachOther ? values.firstSurgicalApproachOther : ''}` : null}
              disabled={!showSurgicalApproachOther}
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={2}>
            <CeosSelectInput
              id="gustillo"
              name="gustillo"
              toshow="gustillo"
              value={values.gustillo}
              label="Classificação Gustillo"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CeosSelectInput
              id="ao"
              name="ao"
              toshow="ao"
              value={values.ao}
              label="Classificação ao"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CeosInput
              id="instrument"
              name="instrument"
              toshow="instrument"
              value={values.instrument}
              label="Instrumento de Pesquisa"
              handleChange={handleChange}
              onChange={setFieldValue}
            />
          </Grid>
          <Grid item xs={2} className={classes.checkboxView}>
            <FormControlLabel
              control={
                <Switch
                  checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                  style={{ margin: 0 }}
                  name="infection"
                  onChange={event => handleSwitchChange('infection', event.target.checked)}
                  checked={ boolState.infection }
                  color="primary"
                />
              }
              label="Infeccao"
            />
          </Grid>
          <Grid item xs={2} className={classes.checkboxView}>
            <FormControlLabel
              control={
                <Switch
                  checkedIcon={<CheckCircleIcon style={{ fontSize: 20 }} />}
                  style={{ margin: 0 }}
                  name="amputation"
                  onChange={event => handleSwitchChange('amputation', event.target.checked)}
                  checked={ boolState.amputation }
                  color="primary"
                />
              }
              label="Amputação Não Traumática"
            />
          </Grid>
          <CeosButton
            variant="contained"
            // className={classes.buttonSuccess}
            type={'submit'}
            label={'Salvar'}
            onClick={(event) => {
              console.log('click valuesss', values)
              // event.preventDefault();
              // console.log('patient...', patient)
              // console.log('clicou aqui tcheee')
              // console.log('values...', values)
              // console.log('selected...', selectedId)
              // rows[selectedId] = newFracture
            }
            }
            // disabled={isDisableFields}
          />
        </Grid>
      </form>
    </Paper>
  )

}

FractureForm.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object
  // product: PropTypes.object.isRequired
};

export default withFormik(FractureForm)
// export default withStyles(styles)(withRouter(withFormik(FractureForm)))

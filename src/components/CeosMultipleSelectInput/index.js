import React from 'react'
import Select from 'react-select'
import * as _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { MenuItem, Paper, Typography } from '@material-ui/core'
import getOptionsToDisplay from "../CeosSelectInput/utils/getOptionsToDisplay";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";

const CeosMultipleSelectInput = ({ onChange, required, label, handleChange, id, value, ...props }) => {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

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

  // get options
  const options = getOptionsToDisplay(id);

  console.log('options...', options);

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id="demo-select-multiple-chip" />}
        renderValue={(selected) => {
          console.log(selected)
          return (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes} />
            ))}
          </div>
        )}}
        MenuProps={MenuProps}
      >
        {options.map((opt) => {
          console.log(opt)
          return <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        })}
      </Select>
    </FormControl>
  )
}



export default CeosMultipleSelectInput

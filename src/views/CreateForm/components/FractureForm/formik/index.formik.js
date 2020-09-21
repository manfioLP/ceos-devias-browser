import * as Yup from 'yup'
import { withFormik } from 'formik/dist/index'

import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

const formatOtherName = (name, variable) => {
  switch (variable) {
    case 'VASCULAR':
      return `(2) Lesões vasculares -${name}`
    case 'NERVOUS':
      return `(3) Lesão de nervos periférico -${name}`
    case 'TRAUMA':
      return `(8) Outro -${name}`
    case 'BONE':
      return `(19) Outro - ${name}`
    case 'LIMB':
      return `(3) Outro - ${name}`
    case 'MECHANISM':
      return `(15) Outro - ${name}`
    case 'SURGICAL':
      return `(4) Outro - ${name}`
    default:
      return `(X) - ${name}`
  }
}

const handleSubmit = (values, { props }) => {
  console.log('formik values...', values);
  console.log('props', props);
  console.log(props.patient._id)

  const valuesComplications = [...values.complications];
  let parsedComplications = valuesComplications.shift();
  valuesComplications.forEach(compl => parsedComplications+= `, ${compl}`);

  let parsedTraumas = '';
  values.traumas.forEach(trauma => parsedTraumas+= `, ${trauma}`);
  const fracture = {
    patient: props.patient._id,
    recordNumber: props.patient.recordNumber,
    ao: values.ao,
    bone: values.boneOther ? formatOtherName(values.boneOther, 'BONE') : values.bone,
    description: values.description,
    firstSurgicalApproach: values.firstSurgicalApproachOther ? formatOtherName(values.firstSurgicalApproachOther, 'SURGICAL') : values.firstSurgicalApproach,
    gustillo: values.gustillo,
    limb: values.limbOther ? formatOtherName(values.limbOther, 'LIMB') : values.limb,
    mechanism: values.mechanismOther ? formatOtherName(values.mechanismOther, 'MECHANISM') : values.mechanism,
    region: values.region,
    amputation: values.amputation,
    infection: values.infection,
    associatedFractureTraumaInjury: parsedTraumas,
    associatedFractureTraumaInjuryOther: values.associatedFractureTraumaInjuryOther ? formatOtherName(values.associatedFractureTraumaInjuryOther, 'TRAUMA') : null,
    nervousTraumaDescription: values.nervousTraumaDescription ? formatOtherName(values.nervousTraumaDescription, 'NERVOUS'): null,
    instrument: values.instrument,
    vascularTraumaDescription: values.vascularTraumaDescription ? formatOtherName(values.vascularTraumaDescription, 'VASCULAR') : null,
    complications: parsedComplications,
  }
  const newRows = [...props.rows];
  newRows[props.selectedId] = fracture;
  props.addFracture(fracture, newRows, props.setRows)
  // props.setRows(newRows)
  props.setShowPortal(false)
  // props.fracture = fracture;
  // props.addFracture
}

export default withFormik({
  propsToValuesMap,
  // validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

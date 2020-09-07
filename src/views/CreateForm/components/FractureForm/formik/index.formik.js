import * as Yup from 'yup'
import { withFormik } from 'formik/dist/index'

import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

// todo: add use of context


const handleSubmit = (values, { props }) => {
  console.log('formik values...', values);
  console.log('props', props);
  console.log(props.patient._id)
  const fracture = {
    patient: props.patient._id,
    recordNumber: props.patient.recordNumber,
    ao: values.ao,
    associatedTraumaInjury: values.associatedTraumaInjuryOther ? values.associatedTraumaInjuryOther : values.associatedTraumaInjury,
    bone: values.boneOther ? values.boneOther : values.bone,
    description: values.description,
    firstSurgicalApproach: values.firstSurgicalApproachOther ? values.firstSurgicalApproachOther : values.firstSurgicalApproach,
    gustillo: values.gustillo,
    limb: values.limbOther ? values.limbOther : values.limb,
    mechanism: values.mechanismOther ? values.mechanismOther : values.mechanism,
    region: values.region,
    amputation: values.amputation,
    infection: values.infection,
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

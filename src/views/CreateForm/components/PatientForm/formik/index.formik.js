import * as Yup from 'yup'
import { withFormik } from 'formik/dist/index'

// import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

// todo: add use of context


const handleSubmit = (values, {props}) => {
  console.log('formik props on submit...', props);
  console.log('values no formik...', values);
  window.alert('paciente salvo!')
  props.addPatient({
    recordNumber: values.recordNumber,
    name: values.name,
    age: values.age,
    hour: values.hour,
    time: values.time,
    exposureTime: values.exposureTime,
    antibiotic: values.antibiotic,
    comorbidities: values.comorbidities,
    profession: values.profession,
    gender: values.gender,
    city: values.city,
    degreeLevel: values.degreeLevel,
  })
  // window.alert('Not implemented!')
  // const valuesToSubmit = { ...values, action: props.docAction }
  // props.savePgiDocument(createPgiJSON(valuesToSubmit))
}

export default withFormik({
  propsToValuesMap,
  // validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

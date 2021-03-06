import * as Yup from 'yup'
import { withFormik } from 'formik'

import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

// todo: add use of context


const handleSubmit = (values, { props }) => {
  window.alert('Not implemented!')
  // const valuesToSubmit = { ...values, action: props.docAction }
  // props.savePgiDocument(createPgiJSON(valuesToSubmit))
}

export default withFormik({
  propsToValuesMap,
  validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

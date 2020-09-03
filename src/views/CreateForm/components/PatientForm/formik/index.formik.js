import * as Yup from 'yup'
import { withFormik } from 'formik/dist/index'

// import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

// todo: add use of context


const handleSubmit = (values, {props}) => {
  if (props.patient.identifier) {
    window.alert('[NOT IMPLEMENTED] Should perform update!')
  } else {
    console.log('formik props on submit...', props);
    console.log('values no formik...', values);
    props.addPatient({
      recordNumber: values.recordNumber,
      name: values.name,
      age: values.age,
      hour: values.hour,
      time: values.time,
      exposureTime: values.exposureTime, // check
      antibioticAtEmergency: values.antibiotic,
      comorbidities: values.comorbidities,
      otherComorbidities: values.otherComorbidities,
      profession: values.professionOther ? values.professionOther : values.profession,
      gender: values.gender.slice(4, values.gender.length),
      city: values.cityOther ? values.cityOther : values.city,
      education: values.degreeLevel,
      // civilStatus: values.civilStatusOther ? values.civilStatusOther : values.civilStatus,
      associatedTraumaInjury: values.associatedTraumaInjury,
      hospitalizationAverageTime: values.hospitalizationAverageTime
    })
  }
}

export default withFormik({
  propsToValuesMap,
  // validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

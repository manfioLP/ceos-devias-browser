import * as Yup from 'yup'
import { withFormik } from 'formik/dist/index'

// import ValidationFracture from './validator'

import propsToValuesMap from './propsMap'

// const weekdays = ['Domingo', 'Segunda', 'Terça ', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

const formatOtherName = (name, variable) => {
  switch (variable) {
    case 'CITY':
      return `(8) Outro -${name}`
    case 'PROFESSION':
      return `(9) Outro -${name}`
    case 'CIVIL':
      return `(8) Outro -${name}`
    case 'TRAUMA':
      return `(8) Outro - ${name}`
    case 'CLOSED_FRACTURE':
      return `(2) Fratura Fechada - ${name}`
    default:
      return `(X) - ${name}`
  }
}

const handleSubmit = (values, {props}) => {
  if (props.patient.identifier) {
    window.alert('[NOT IMPLEMENTED] Should perform update! \n mas como ainda nao foi implementado, espera rs')
  } else {
    console.log('formik props on submit...', props);
    console.log('values no formik...', values);
    // const weekday = weekdays[values.date.day()]
    const dateForIdentifier = values.date.date()
    let parsedTraumas = '';
    values.traumas.forEach(trauma => parsedTraumas+= `, ${trauma}`);
    props.addPatient({
      recordNumber: values.recordNumber,
      name: values.name,
      age: values.age,
      traumaHour: values.hour,
      time: values.time,
      exposureTime: values.exposureTime, // check
      antibioticAtEmergency: values.antibiotic,
      antibioticAtEmergencyOther: values.antibioticOther,
      comorbidities: values.comorbidities,
      otherComorbidities: values.otherComorbidities,
      profession: values.professionOther ? formatOtherName(values.professionOther, 'PROFESSION') : values.profession,
      gender: values.gender.length,
      city: values.cityOther ? formatOtherName(values.cityOther, 'CITY') : values.cityOther,
      education: values.education,
      civilStatus: values.civilStatusOther ? formatOtherName(values.civilStatusOther, 'CIVIL') : values.civilStatusOther,
      hospitalizationAverageTime: values.hospitalizationAverageTime,
      admissionDate: values.date,
      date: dateForIdentifier,
      death: values.death,
      drugs: values.drugs,
      weekday: values.weekday,
      month: values.month,
      ageCategory: values.ageCategory,
      traumaHourCategory: values.traumaHourCategory,
      exposureTimeCategory: values.exposureTimeCategory,
      admissionHourCCCategory: values.admissionHourCCCategory,
      admissionHourCC: values.admissionHourCC,
      associatedTraumaInjury: parsedTraumas,
      race: values.race,
      associatedTraumaInjuryOther: values.associatedTraumaInjuryOther ? formatOtherName(values.associatedTraumaInjuryOther, 'TRAUMA') : null,
      associatedClosedFractureDescription: values.associatedClosedFractureDescription ? formatOtherName(values.associatedClosedFractureDescription, 'CLOSED_FRACTURE') : null
    })
  }
}

export default withFormik({
  propsToValuesMap,
  // validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

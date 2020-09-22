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
  console.log('formik props on submit...', props);
  console.log('values no formik...', values);
  const dateForIdentifier = values.date.date()
  console.log('data...',values.date.date())

  const patientValuesObject = {
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
    gender: values.gender,
    city: values.cityOther ? formatOtherName(values.cityOther, 'CITY') : values.city,
    education: values.education,
    civilStatus: values.civilStatusOther ? formatOtherName(values.civilStatusOther, 'CIVIL') : values.civilStatus,
    hospitalizationAverageTime: values.hospitalizationAverageTime,
    admissionDate: values.date,
    date: dateForIdentifier,
    death: values.death,
    drugs: values.drugs,
    ethylista: values.ethylista,
    smoker: values.smoker,
    diabetes: values.diabetes,
    has: values.has,
    weekday: values.weekday,
    month: values.month,
    ageCategory: values.ageCategory,
    traumaHourCategory: values.traumaHourCategory,
    exposureTimeCategory: values.exposureTimeCategory,
    admissionHourCCCategory: values.admissionHourCCCategory,
    admissionHourCC: values.admissionTimeCC,
    // associatedTraumaInjury: parsedTraumas,
    race: values.race,
    associatedTraumaInjuryOther: values.associatedTraumaInjuryOther ? formatOtherName(values.associatedTraumaInjuryOther, 'TRAUMA') : null,
    associatedClosedFractureDescription: values.associatedClosedFractureDescription ? formatOtherName(values.associatedClosedFractureDescription, 'CLOSED_FRACTURE') : null,
    fracturesNumber: values.fracturesNumber,
  };

  if (props.patient.identifier) {
    patientValuesObject.associatedTraumaInjury = props.patient.associatedTraumaInjury
    props.updatePatient(patientValuesObject, props.patient.identifier);
  } else {
    const valuesTraumas = [...values.traumas];

    let parsedTraumas = valuesTraumas.shift();

    valuesTraumas.forEach(trauma => parsedTraumas+= `, ${trauma}`);
    patientValuesObject.associatedTraumaInjury = parsedTraumas
    props.addPatient(patientValuesObject)
  }
}

export default withFormik({
  propsToValuesMap,
  // validationSchema: props => Yup.lazy(values => ValidationFracture(props)),
  handleSubmit
})

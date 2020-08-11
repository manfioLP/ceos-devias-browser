import * as Yup from 'yup'

// todo: add parameters
const ValidationPatient = ({match}) => {

  // todo: retrieve params if needed
  const { codeFracture } = match.params;

  return Yup.object().shape({
    profession: Yup.string()
      .nullable()
      .default(null),
    recordNumber: Yup.string()
      .required('Numero de Prontuario eh obrigatorio!')
      .default(null)
  })
}

export default ValidationPatient

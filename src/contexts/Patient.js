import React, { useState, createContext } from 'react';

export const PatientContext = createContext();

export const PatientProvider = props => {
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
  const serverEndpoint = `${corsAnywhere}/https://0xoc2xlzck.execute-api.us-east-1.amazonaws.com/dev`

  const [patient, setPatient] = useState({identifier: null})

  const addPatient = async patient => {
    const res = await fetch(`${serverEndpoint}/patient`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(patient)
    });

    res
      .json()
      .then(res => {
        if (res.err) {
          window.alert(`Nao foi possivel criar o pacient \n Motivo: ${res.err.message}`)
        } else {
          window.alert('Paciente criado com sucesso!')
          console.log(res)
          setPatient(res);
        }
      })
      .catch(err => {
        window.alert('ERROR DE FETCHING')
        console.log('fetching err...', err)
      })
  }

  return (
    <PatientContext.Provider value={{
      patientState: [patient, setPatient],
      addPatient,
    }}>
      {props.children}
    </PatientContext.Provider>
  )
}

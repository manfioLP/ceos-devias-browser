import React, { useState, createContext } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const PatientContext = createContext();

export const PatientProvider = props => {
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
  const serverEndpoint = `${corsAnywhere}/https://0xoc2xlzck.execute-api.us-east-1.amazonaws.com/dev`

  const [patient, setPatient] = useState({identifier: null})
  const [patientsCount, setPatientsCount] = useState(null)

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

  const getPatients = async (page, limit, setPatients) => {
    const res = await fetch(`${serverEndpoint}/patient?limit=${limit}&page=${page}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });

    res
      .json()
      .then( res => {
        if (res.err) {
          window.alert(`Nao foi buscar os pacientes :( \n Motivo: ${res.err.message}`)
        } else {
          window.alert('Pacientes buscados com sucesso!')
          console.log(res)
          setPatients(res.data);
        }
      })
    .catch(err => {
      window.alert('ERROR DE FETCHING')
      console.log('fetching err...', err)
    })
  }

  const exportPatients = async () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
    }

    // TODO: change route to a new one that returns all patients populated with fractures
    const res = await fetch(`${serverEndpoint}/patient/export`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });

    console.log('exportando...')
    res
      .json()
      .then(res => {
        if (res.err) {
          window.alert(`Nao foi exportar os pacientes =( \n Nos desculpe e fale com o Poldo \n Motivo: ${res.err.message}`)
        } else {
          console.log(res)
          exportToCSV(res.data, 'Pacientes.xls')
          window.alert('Pacientes exportados com sucesso!')
        }
      })
  }

  const countPatients = async () => {
    const res = await fetch(`${serverEndpoint}/patient/count`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });

    res
      .json()
      .then( res => {
        if (res.err) {
          console.log('NAO ATUALIZOU A CONTAGEM DOS PACIENTES NO DASHBOARD')
        } else {
          console.log('BUSCOU A CONTAGEM DE FRATURAS DE BOAS')
          setPatientsCount(res);
        }
      })
    .catch(err => {
      console.log('[ERROR DE FETCHING] fetching err...', err)
    })
  }

  return (
    <PatientContext.Provider value={{
      patientState: [patient, setPatient],
      patientsCount: [patientsCount, setPatientsCount],
      addPatient,
      getPatients,
      exportPatients,
      countPatients
    }}>
      {props.children}
    </PatientContext.Provider>
  )
}

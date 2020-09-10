import React, { useState, createContext } from 'react';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const FractureContext = createContext();

const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
const serverEndpoint = `${corsAnywhere}/https://hou0uu9u2k.execute-api.us-east-1.amazonaws.com/dev/`;

export const FractureProvider = props => {
  const [rows, setRows] = useState([
    // {bone: 'testBone', amputation: true, limb: 'test limb', firstSurgicalApproach: 'testing'}
    ]);

  const [selectedId, setSelectedId] = useState(null);

  const addFracture = async (fracture, newRows, setRows) => {
    const res = await fetch(`${serverEndpoint}/fracture`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(fracture)
    });

    res.json()
      .then(res => {
        if (res.err) {
          window.alert(`Nao foi possivel criar a fratura \n Motivo: ${res.err.message}`)
        } else {
          setRows(newRows);
          window.alert('Fratura adicionada com sucesso!');
          console.log(res)
          // setPatient(res);
        }
      });
  }

  const getFractures = async (page, limit, setFractures) => {
    const res = await fetch(`${serverEndpoint}/fracture?limit=${limit}&page=${page}`, {
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
          window.alert(`Nao foi possivel buscar as fraturas :( \n Motivo: ${res.err.message}`)
        } else {
          window.alert('Pacientes buscados com sucesso!')
          console.log(res)
          setFractures(res.data);
        }
      })
      .catch(err => {
        window.alert('ERROR DE FETCHING')
        console.log('fetching err...', err)
      })
  }

  const exportFractures = async () => {
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
    const res = await fetch(`${serverEndpoint}/fracture/export`, {
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
          window.alert(`Nao foi possivel exportar as fraturas =( \n Nos desculpe e fale com o Poldo \n Motivo: ${res.err.message}`)
        } else {
          console.log(res)
          exportToCSV(res.data, 'Fraturas.xls')
          window.alert('Fraturas exportadas com sucesso!')
        }
      })
  }


  return (
    <FractureContext.Provider value={{contextRows: [rows, setRows], selected: [selectedId, setSelectedId], addFracture, getFractures, exportFractures}}>
      {props.children}
    </FractureContext.Provider>
  )
}

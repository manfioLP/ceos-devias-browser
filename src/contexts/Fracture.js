import React, { useState, createContext } from 'react';

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


  return (
    <FractureContext.Provider value={{contextRows: [rows, setRows], selected: [selectedId, setSelectedId], addFracture, getFractures}}>
      {props.children}
    </FractureContext.Provider>
  )
}

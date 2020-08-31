import React, { useState, createContext } from 'react';

export const FractureContext = createContext();

export const FractureProvider = props => {
  const [rows, setRows] = useState([
    {bone: 'testBone', amputation: true, limb: 'test limb', firstSurgicalApproach: 'testing'}
    ]);

  const [selectedId, setSelectedId] = useState(null);


  return (
    <FractureContext.Provider value={{contextRows: [rows, setRows], selected: [selectedId, setSelectedId]}}>
      {props.children}
    </FractureContext.Provider>
  )
}

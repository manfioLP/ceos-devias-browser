import options from './options'

const getOptionsToDisplay = id => {
  const arrayOptions = options[id];

  if (arrayOptions) {
    return arrayOptions.map( option => `(${option.opt}) ${option.value}` );
  } else {
    return [`Options not found`]
  }
};

export default getOptionsToDisplay

import React from 'react';

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  const types = {
    email: {
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Preencha um email válido',
    },
    default: {
      regex: /./,
      message: 'Formato inválido',
    },
  };

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (types[type] && types[type].regex.test(value)) {
      setError(null);
      return true;
    } else {
      setError(types[type].message);
      return false;
    }
  }

  function onChange({ target }) {
    setError(null);
    error && validate(value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    error,
  };
};

export default useForm;

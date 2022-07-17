import React, { useRef } from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  const response = useRef(null);
  const json = useRef(null);

  const request = React.useCallback(async (url, options) => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      response.current = await fetch(url, options);
      json.current = await response.current.json();
      if (!response.current.ok) throw new Error(json.current.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setData(json.current);
      setLoading(false);
      return { response: response.current, json: json.current };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;

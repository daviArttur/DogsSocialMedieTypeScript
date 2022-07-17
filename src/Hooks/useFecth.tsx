import React, { useRef } from 'react';

type RequestType = {
  url: string,
  options: {}
}

const useFetch = () => {
  const [data, setData] = React.useState<null | Object>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  let response: null | Response = null;
  let json : null | {token: string, message: string} = null;

  const request = React.useCallback(async (url : string, options: {}) => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      console.log(json)
      if (!response.ok) throw new Error('Um error aconteceu');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response: response, json: json };
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

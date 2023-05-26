import axios from 'axios';
import { useState } from 'react';

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async (config, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: config.method ? config.method : 'GET',
        url: config.url,
        data: config.data ? JSON.stringify(config.data) : null,
      });

      if (response.statusText !== 'OK') throw new Error('Request Failed');

      setIsLoading(false);

      if (applyData) applyData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useAxios;

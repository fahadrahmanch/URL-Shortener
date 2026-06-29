import axios from 'axios';

export const getOriginalUrlByCode = async (code: string): Promise<{ originalUrl: string }> => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${code}`);
  return response.data;
};
 
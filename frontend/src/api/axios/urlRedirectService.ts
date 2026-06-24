import axios from 'axios';

export const getOriginalUrlByCode = async (code: string): Promise<{ originalUrl: string }> => {
  const response = await axios.get(`http://localhost:3000/${code}`);
  return response.data;
};
 
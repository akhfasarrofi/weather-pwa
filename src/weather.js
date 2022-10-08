import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const weatherPosition = async ({ lat, long }) => {
  const params = `lat=${lat}&lon=${long}&APPID=${API_KEY}`;
  const { data } = await axios.get(`${URL}?${params}`);
  return data;
};

export const searchWeather = async (query) => {
  const params = `q=${query}&APPID=${API_KEY}`;
  const { data } = await axios.get(`${URL}?${params}`);
  return data;
};

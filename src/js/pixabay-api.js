import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { BASE_URL, API_KEY, defaultParams } from './helpers';

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    page,
    ...defaultParams,
  });
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Ooops! Somethings went wrong`,
      position: 'topRight',
      timeout: 4000,
    });
  }
}

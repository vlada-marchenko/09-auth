import axios from 'axios'

const baseURL = '/api';

export const nextServer = axios.create({
  baseURL: baseURL ,
  withCredentials: true,
})

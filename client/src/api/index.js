import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
  timeout: 3000000,
})

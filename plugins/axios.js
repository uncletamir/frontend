import axios from 'axios'
const qs = require('qs')

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {
    arrayFormat: 'indices'
  })
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBSERVICE_BASEURL,
})

export default instance

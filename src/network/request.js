import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://huangzun.top:8024',
    timeout: 5000
  })

  // axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // console.log(err)
  })

  return instance(config)
}


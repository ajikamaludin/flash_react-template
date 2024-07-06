import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
  baseURL: `${BASE_URL}`,
})

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response
    }
  },
  (error) => {
    const {
      status,
      data: { message },
    } = error.response
    if (status === 401 && message === 'ExpiredToken') {
      localStorage.removeItem('user')
    } else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response)
    } else return Promise.reject(error)
  }
)

export async function login(payload) {
  const { username, password } = payload
  return instance({
    method: 'POST',
    url: `/login`,
    data: { username, password },
  }).then((response) => response.data)
}

export async function register(payload) {
  const { name, email, password, username, phone } = payload
  return instance({
    method: 'POST',
    url: `/register`,
    data: { real_name: name, email, password, username, phone },
  }).then((res) => res.data)
}

export async function getProfile(token) {
  return instance({
    method: 'GET',
    url: `/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data)
}

export async function updateprofile(payload, token) {
  return instance({
    method: 'PUT',
    url: `/profile`,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data)
}

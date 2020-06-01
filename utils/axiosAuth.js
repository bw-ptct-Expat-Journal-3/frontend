import axios from 'axios';

export const axiosWithAuth = () => {  // token allows you to go to private route achieved by login
  export const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://expat-journal-backend-jensen.herokuapp.com/',
              // "http://localhost:8000/api/auth/register",
    headers: {
      //Accept: "application/json",
      "content-type": "application/json",
      Authorization: 'token'
    }
  })
}

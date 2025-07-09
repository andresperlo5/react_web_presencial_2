import axios from "axios"

const token = JSON.parse(sessionStorage.getItem("token"))
console.log(token)

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_LOCAL}`
})

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    "auth": `${token}`
  },
}

export default clientAxios
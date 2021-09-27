// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'
//
// TODO: make base api for auth
export const authApiUrl = `${TicketScanerApiV1BaseUrl}auth/`
//
// TODO: make base api for login
export const loginApiUrl = `${TicketScanerApiV1BaseUrl}auth/login/`
//
// TODO: make base api for register
export const registerApiUrl = `${TicketScanerApiV1BaseUrl}auth/registration/`

// TODO: make base api for users

export const userApiUrl = `${authApiUrl}/user/`
//
//  TODO: make api for user
export const GetUser = async(token) => {
  const res = await axios.get(userApiUrl,
    {
      headers: {
        'Authorization': `Token ${token}` 
      }
    }
    )
  console.log("axios user")
  return res
}
//
//  TODO: make api for logiin
export const LoginRequest = async(userInfo) => {
    console.log("userInfo: ",userInfo)
    const res = await axios.post(`${loginApiUrl}`,userInfo)
    console.log("user key: ",res)
    localStorage.setItem('token', res?.data.key)
    return res
  }
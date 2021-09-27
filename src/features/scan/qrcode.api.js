// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'

// TODO: make base api for qrcodes

export const qrcodeApiUrl = `${TicketScanerApiV1BaseUrl}qrcodes/`
//
// TODO: make base api for scanlogs
export const scanlogApiUrl = `${TicketScanerApiV1BaseUrl}scanlogs/`
//
//  TODO: make api for qrcodes
export const GetQrcodes = async() => {
  const res = await axios.get(qrcodeApiUrl)
  console.log("axios")
  return res
}
//  TODO: make api for qrcode by id
export const GetQrcodeById = async(id,token) => {
  console.log("id:qrcode=> ",id)
  const res = await axios.get(`${qrcodeApiUrl}${id}`,
  { headers: { Authorization: `Token ${token}`}}
  )
  console.log("axios:qrcode  by id")
  return res
}
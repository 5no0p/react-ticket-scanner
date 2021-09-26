// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'

// TODO: make base api for qrcodes

export const qrcodeApiUrl = `${TicketScanerApiV1BaseUrl}qrcodes`
//
//  TODO: make api for qrcodes
export const GetQrcodes = async() => {
  const res = await axios.get(qrcodeApiUrl)
  console.log("axios")
  return res
}
//  TODO: make api for qrcode by id
export const GetQrcodeById = async(id) => {
  console.log("id:qrcode=> ",id)
  const res = await axios.get(`${qrcodeApiUrl}/${id}`)
  console.log("axios:qrcode  by id")
  return res
}
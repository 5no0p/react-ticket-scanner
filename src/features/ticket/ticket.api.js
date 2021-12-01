// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'

// TODO: make base api for tickers

export const ticketApiUrl = `${TicketScanerApiV1BaseUrl}tickets`

export const qrcodeApiUrl = `${TicketScanerApiV1BaseUrl}qrcodes`

//
//  TODO: make api for tickits
export const GetTickets = async() => {
  const res = await axios.get(ticketApiUrl)
  console.log("axios")
  return res
}

export const GetTicketByQrcode = async(id,token) => {
  console.log("qrcode: ",id)
  let header
  localStorage.getItem('token')
  ?header = {
    headers: {
      'Authorization': `Token ${token}` 
            }
          }
  :header = {}
  const res = await axios.get(`${qrcodeApiUrl}/${id}`,header)
  console.log("axios by qrcode")
  return res
}

export const GetTicketById = async(id) => {
  console.log("id: ",id)
  const res = await axios.get(`${ticketApiUrl}/${id}`)
  console.log("axios by id")
  return res
}

export const GetTicketByPage = async(page) => {
  const res = await axios.get(`${ticketApiUrl}?p=${page}`)
  console.log("axios ticket page")
  return await res.data
}

export const AddTicket = async(info) => {
  console.log("data update ticket: ",info)
  const {data,token} = info
  const res = await axios.post(`${ticketApiUrl}/`,data,
  {
    headers: {
      'Authorization': `Token ${token}` 
    }
  }
  )
  console.log("axios for update tiket: ",res)
  return res
}

export const UpdateTicket = async(data) => {
  console.log("data update ticket: ",data)
  const res = await axios.patch(`${ticketApiUrl}/${data.id}/`,data.data,
  {
    headers: {
      'Authorization': `Token ${data.token}` 
    }
  }
  )
  console.log("axios for update tiket: ",res)
  return res
}
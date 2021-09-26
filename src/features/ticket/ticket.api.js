// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'

// TODO: make base api for tickers

export const ticketApiUrl = `${TicketScanerApiV1BaseUrl}tickets`
//
//  TODO: make api for tickits
export const GetTickets = async() => {
  const res = await axios.get(ticketApiUrl)
  console.log("axios")
  return res
}

export const GetTicketById = async(id) => {
  console.log("id: ",id)
  const res = await axios.get(`${ticketApiUrl}/${id}`)
  console.log("axios by id")
  return res
}
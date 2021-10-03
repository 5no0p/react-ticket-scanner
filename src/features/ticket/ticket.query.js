// TODO: import dependences
import {useQuery} from 'react-query'  //import useQuery
import {GetTickets, GetTicketById, GetTicketByQrcode} from './ticket.api' //import tickets feching function
//
// TODO: make tickets query
export const TicketsQuery = () => useQuery('tickets',GetTickets,{
// disable window focus refetching
  refetchOnWindowFocus: false,
  retry:1,
}) 
// TODO: make ticket query
export const TicketByIdQuery = (id) => useQuery(['ticket',id],()=>GetTicketById(id),{
  // disable window focus refetching
    refetchOnWindowFocus: false,
    retry:1,
  })

export const TicketByQrcodeQuery = (id,token) => useQuery(['ticket_qrcode',id,token],()=>GetTicketByQrcode(id,token),{
  // disable window focus refetching
    refetchOnWindowFocus: false,
    retry:1,
  })
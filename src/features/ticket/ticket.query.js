// TODO: import dependences
import {useQuery,useMutation} from 'react-query'  //import useQuery
import {GetTickets, GetTicketById, GetTicketByQrcode, UpdateTicket} from './ticket.api' //import tickets feching function
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

export const TicketByQrcodeQuery = (id,token) => useQuery(['ticket_qrcode',id],()=>GetTicketByQrcode(id,token),{
  // disable window focus refetching
    refetchOnWindowFocus: false,
    retry:1,
  })

export const  TicketMutation = (ticketInfo) => {

  return useMutation(ticket => UpdateTicket(ticket),{
    onSuccess: (data) => {
      // queryClient.fetchQuery(['ticket',data.data.qrcode],
      // ()=>GetTicketById(data.data.qrcode,localStorage.getItem('token')))
    }
  })

  //return mutation.mutate(ticketInfo)

}


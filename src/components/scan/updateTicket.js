import {useMutation} from 'react-query'  //import useMutation
import {UpdateTicket} from '../../features/ticket/ticket.api'


export const CheckTicket = (data) => {
    const mutation = useMutation(usernfo => UpdateTicket(usernfo))
    console.log("start update")
    mutation.mutate(data)
    
}
  
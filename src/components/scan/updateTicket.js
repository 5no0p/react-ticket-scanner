import {useMutation} from 'react-query'  //import useMutation
import {UpdateTicket} from '../../features/ticket/ticket.api'


export const CheckTicket = (data) => {
    const mutation = useMutation(usernfo => UpdateTicket(usernfo))
    console.log("start update")
    if(localStorage.getItem('token')){
    console.log("start update 2")
    mutation.mutate(data)
    }
}
  
import { useQuery } from "react-query";
import {fetchTickts} from './dumyApi'

export const Res = () => useQuery('tickets',fetchTickts,  { 
    refetchOnWindowFocus: false ,
   
    //refetchOnMount: true,

})
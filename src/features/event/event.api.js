import { useQuery } from "react-query";
import axios from "axios";

export const fetchEvents = async () => {
    const res = await axios('https://ticket-scanner.herokuapp.com/api/v1/events/');
    return await res
}

export const GetEvents = () => useQuery('events',fetchEvents,  { 
    refetchOnWindowFocus: false ,
    //refetchOnMount: true,

})
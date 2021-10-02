import { useQuery } from "react-query";
import { GetEvents,GetEventById } from "./event.api";


export const EventsQuery = () => useQuery('events',GetEvents,  { 
    refetchOnWindowFocus: false ,
    //refetchOnMount: true,

})

export const EventByIdQuery = (id) => useQuery(['events',id],() => GetEventById(id),  { 
    refetchOnWindowFocus: false ,
    //refetchOnMount: true,

})
import { useQuery } from "react-query";
import {queryClient} from '../../App'


export const fetchTickts = async () => {
    const res = await fetch('https://ticket-scanner.herokuapp.com/api/v1/tickets/');
    return res.json()
}


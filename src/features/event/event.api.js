
import axios from "axios";

import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'


export const eventApiUrl = `${TicketScanerApiV1BaseUrl}events`


export const GetEvents = async () => {
    console.log("get event axios")
    const res = await axios(`${eventApiUrl}`);
    return res
}

export const GetEventById = async (id) => {
    console.log("get event by id: ",id)
    const res = await axios(`${eventApiUrl}/${id}`);
    return res
}


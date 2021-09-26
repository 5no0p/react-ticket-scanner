// TODO: make base url to ticket scanner api


//export const TicketScanerApiBaseUrl = process.env.REACT_APP_BaseUrl 
export const TicketScanerApiBaseUrl = process.env.REACT_APP_NODEENV === 'production'?process.env.REACT_APP_BaseUrl:'http://localhost:8000/api/' 

export const TicketScanerApiV1BaseUrl =
  `${TicketScanerApiBaseUrl}v1/`;

// TODO: impotr dependences
//       1.import react
import React from 'react'
//       2. import QR code generator
import QRCode from "react-qr-code";
//       3. import queryClient
import {queryClient} from '../../App'
//       4. import useParams
import {Link, useParams} from "react-router-dom";
//       5. import TicketByIdQuery
import { TicketByIdQuery } from '../../features/ticket/ticket.query';
import Spinner from '../../components/common/spinner';//import spinner

//
// TODO: make function to display ticket details
export function TicketGeneral(){
// TODO: declear variables
//      1.get the ticket uuid
  let { ticketUuid } = useParams();
//      2. declear variable to check cached data
  let isCached = true
//      3. declear variable to hold data from query
  let getData,getIsLoading,getIsError,getEerror
//      4.get tickets query key
  const queryKey = "tickets"
//      
// TODO: check if data is in query cache, if not make api request
//      1.get data from cached tickets query if undefine gi step 2
if(queryClient.getQueryData(queryKey) !== undefined){
//      get the data object from cached query  
  const {isLoading, isError, data, error} = queryClient.getQueryData(queryKey)
//      hold the data object to data holder
  getData = data
  getData = data
  getIsLoading=isLoading
  getIsError=isError
  getEerror=error
  console.log("data from cashe",getData)
//      2. make api request to get ticket details
}else{
//      no cached data
  isCached = false
//       send api with ticket uuiid
  const {isLoading, isError, data, error} = TicketByIdQuery(ticketUuid)
//       hold the data object in data holder
  getData = data
  getData = data
  getIsLoading=isLoading
  getIsError=isError
  getEerror=error
  console.log("data from api",getData)
}

//       make sure to get data object
const data = getData?('status' in getData)?getData.data:getData:getData

//       if data holder hold cached data find ticket by uuid
const ticketData = isCached?data?.find(d => d.tid === ticketUuid):data
console.log("FINAL",ticketData)


 
  return(
    <>      
      {getIsLoading && 
        <>
           <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
             <Spinner />
           </div>
        </>
      }
      {getIsError &&
        <>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <span>Error: {getEerror.message}</span>
        </div>
     </>
      }
      {ticketData && 
      <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center"style={{marginTop:"3.75rem"}}>
        <div className="card">
        <div className="card-header text-center">
        {ticketData.category.event.name}
        </div>
        <div className="d-flex justify-content-center my-4"><QRCode value={ticketData.qrcode}/></div>
          <div className="card-body text-center">
            <h5 className="card-title" style={{backgroundColor:`${ticketData.category.color}`,color:'white'}}>
              {ticketData.category.name}</h5>
              <Link to={`/tickets/${ticketData.tid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}>
              <p className="card-text">{ticketData.tid}</p></Link>
            
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          </div>
          <div className="card-footer text-muted">
            T-<strong>{ticketData.table}</strong>
          </div>
        </div>
      
    </div>
    
      }
      
    </>
  )
}

export default function TicketGeneralWarpper(){

  return(
    <>
    <div>
    <TicketGeneral />
    </div>
    </>
    
  )

}
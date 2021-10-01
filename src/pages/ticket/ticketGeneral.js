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
import Navbar from '../../components/navbar';//import navbar 
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
const ticketData = isCached?data?.find(d => d.uuid === ticketUuid):data
console.log("FINAL",ticketData)


 
  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      <div>
      <Navbar />
      </div>
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
      <div style={{marginTop:"3.75rem"}}>
      <div className="row">
        <div className="col-9 d-flex align-items-center">{/* event name */}
          <div className="ticket-warper">{/* ticket event warper*/}
            <div>{/* event name tage*/}
            <p className="m-0"><small>Event</small></p>
            </div>
            <div>{/* event name data*/}
              <p><strong>{ticketData.category.event.name}</strong></p>
            </div>
            </div>
        </div>
          <div className="col d-flex justify-content-end">{/* ticket date */}
            <div className="ticket-warper">{/* ticket date warper*/}
                <div className="Category-warper">
                    <div>{/* ticket category tage*/}<p className="m-0"><small>Category</small></p></div>
                    <div>{/* ticket category data*/}<p><strong>{ticketData.category.name}</strong></p></div>
                </div>
                <div className="Extra-warper">
                    <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Table</small></p></div>
                    <div>{/* ticket nuumber data*/}<p><strong>{ticketData.table}</strong></p></div>
                </div>
            </div>
          </div>
      </div>

      <div className="d-flex justify-content-center">{/* ticket QRcode image */}(<QRCode value={ticketData.ticket_qrcode[0].qrcode}/></div>

      <div>{/* ticket more details */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Details</small></p></div>
        <div>{/* ticket nuumber data*/}<Link to={`/tickets/${ticketData.uuid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}><p><strong>{"-->"}</strong></p></Link></div>
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
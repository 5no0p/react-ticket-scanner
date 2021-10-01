// TODO: impotr dependences
//       1.import react
import React from 'react'
//       2. import queryClient
import {queryClient} from '../../App'
//       3. import useParams
import {useParams,useRouteMatch} from "react-router-dom";
//       4. import TicketByIdQuery
import { TicketByIdQuery } from '../../features/ticket/ticket.query';
import Navbar from '../../components/navbar';//import navbar 
import Spinner from '../../components/common/spinner';//import spinner


//
// TODO: make function to display ticket details
export function TicketDetails({ticketUuid}){
// TODO: declear variables

//      2. declear variable to check cached data
  let isCached = true
//      3. declear variable to hold data from query
  let getData,isLoading,isError,error
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
  console.log("data from cashe",getData)
//      2. make api request to get ticket details
}else{
//      no cached data
  isCached = false
//       send api with ticket uuiid
  const {data,isLoading,isError,error} = TicketByIdQuery(ticketUuid)
//       hold the data object in data holder
  getData = data
  isLoading=isLoading
  isError=isError
  error=error
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
      {isLoading && 
        <>
           <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
             <Spinner />
           </div>
        </>
      }
      {isError &&
        <>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <span>Error: {error.message}</span>
        </div>
     </>
      }
      {ticketData && 
       <div style={{
        margin: "10vh 1vw"
      }}>
      <div className={`${ticketData.validity===true?"bg-success":"bg-danger"} min-vh-1 w-100 d-flex justify-content-center`}>
      {ticketData.validity?"valid":"expired"}
      </div>
      <div className="row">
        <div className="col-9">{/* event name */}
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
              <div>{/* ticket date tage*/}
                <p className="m-0"><small>Date</small></p>
              </div>
              <div>{/* ticket date data*/}
              <p><strong>{new Intl.DateTimeFormat('en-GB', {month:'short',day:'2-digit'}).format(new Date(ticketData.payment_info.purchased_at))}</strong></p>
              </div>
            </div>
          </div>
      </div>

      <div className="row">
        <div className="col-9">{/* ticket payment */}
          <div className="ticket-warper">{/* ticket Payment warper*/}
            <div>{/* ticket payment tage*/}<p className="m-0"><small>Payment</small></p></div>
            <div>{/* ticket payment data*/}<p><strong>{ticketData.payment_info.amount_of_payment}</strong></p></div>
          </div>
        </div>
        <div className="col d-flex justify-content-end">{/* ticket category */}
          <div className="ticket-warper">{/* ticket category warper*/}
            <div>{/* ticket category tage*/}<p className="m-0"><small>Category</small></p></div>
            <div>{/* ticket category data*/}<p><strong>{ticketData.category.name}</strong></p></div>
          </div>
        </div>
      </div>

      <div>{/* ticket name */}
        <div>{/* ticket name tage*/}
          <p className="m-0"><small>Name</small></p>
        </div>
        <div>{/* ticket name data*/}
        <p><strong>{ticketData.name}</strong></p>
        </div></div>
      <div>{/* ticket number */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Number</small></p></div>
        <div>{/* ticket nuumber data*/}<p><strong>{ticketData.uuid}</strong></p></div>
      </div>

      <div>{/* ticket more details */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Table</small></p></div>
        <div>{/* ticket nuumber data*/}<p><strong>{ticketData.extral_info.Table}</strong></p></div>
      </div>
    </div>

      }
      
    </>
  )
}

export default function TicketDetailsWarpper(){
    //      1.get the ticket uuid
  let { ticketUuid } = useParams();
  console.log("param: ",useParams())
  return(
    <>
    <div className="mx-4">
    <TicketDetails ticketUuid={ticketUuid} />
    </div>
    </>
    
  )

}
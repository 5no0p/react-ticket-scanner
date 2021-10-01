// TODO: impotr dependences
//       1.import react
import React,{useState,useEffect} from 'react'
//       2. import queryClient
import {queryClient} from '../../App'
//       3. import GetQrcodesQueryById

import {CheckTicket} from './updateTicket'
import {GetQrcodeById} from '../../features/scan/qrcode.api' //import tickets feching function



import {Link } from "react-router-dom";

import {GetQrcodeData} from './getQrcodeData'

import Sound from './playSound'

import {useMutation} from 'react-query'  //import useMutation
import {UpdateTicket} from '../../features/ticket/ticket.api'
import Alerts from './playMount'
import Spinner from '../common/spinner';



//
// TODO: make function to display ticket details
export function TicketQrcodeDetails({ticketQrcode,isScan}){
// declear variables

  const [isUpdate, setIsUpdate] = useState(isScan)
  const [isValid, setIsValid] = useState(true)

  const {ticketData,isError,error,isLoading,status,data} = GetQrcodeData(ticketQrcode)
    
  let ticketUpdate = {}
  
  const mutation = useMutation(usernfo => UpdateTicket(usernfo),{
    onSuccess: (data) => {
      queryClient.fetchQuery(['qrcode',data.data.ticket_qrcode[0].qrcode,localStorage.getItem('token')],
      ()=>GetQrcodeById(data.data.ticket_qrcode[0].qrcode,localStorage.getItem('token')))
    }
  })





if(ticketData && ticketData.ticket?.validity===true && !isUpdate && localStorage.getItem('token')){
  ticketUpdate = {
    id:ticketData.ticket.uuid,
    data:{
      validity:false
    },
    token:localStorage.getItem('token')
  }
  mutation.mutate(ticketUpdate)
  setIsUpdate(!isScan)
}

if (isLoading) {
  console.log("Loading...")
}

if (isError) {
  console.log("status: ",error.response)
  setIsValid(false)
}

if (ticketData){
  setIsValid(ticketData.ticket.validity)
}
  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      {isLoading &&
        <>
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Spinner />
          </div>
        </>
      }
      {isError && 
        <>
        <Sound ticketData={isValid}/> 
        <div className={`${error.response.status===404?"bg-dark":"bg-warning "} h-auto w-100 d-flex justify-content-center`}>
          <div className="text-white">Foreign</div>
        </div>
        <div className="">{ticketQrcode}</div>
        
      </>
      }
      {ticketData && 
            <div style={{margin: "10vh 1vw"}}>
            <Sound ticketData={isValid}/> 
            <div className={`${ticketData.ticket.validity===true?"bg-success":"bg-danger"} h-auto w-100 d-flex justify-content-center`}>
              {ticketData.ticket.validity===true?"valid":"expired"}
            </div>
            <div className="row">
              <div className="col-9">{/* event name */}
                <div className="ticket-warper">{/* ticket event warper*/}
                  <div>{/* event name tage*/}
                  <p className="m-0"><small>Event</small></p>
                  </div>
                  <div>{/* event name data*/}
                    <p><strong>{ticketData.ticket.category.event.name}</strong></p>
                  </div>
                  </div>
              </div>
              <div className="col d-flex justify-content-end">{/* ticket date */}
                  <div className="ticket-warper">{/* ticket date warper*/}
                      <div className="Category-warper">
                          <div>{/* ticket category data*/}<p><strong>{ticketData.ticket.category.name}</strong></p></div>
                      </div>
                      <div className="Extra-warper">
                          <div>{/* ticket nuumber data*/}<p><strong>T-{ticketData.ticket.table}</strong></p></div>
                      </div>
                  </div>
                </div>
            </div>
      
            <div>{/* ticket name */}
              <div>{/* ticket name tage*/}
                <p className="m-0"><small>Name</small></p>
              </div>
              <div>{/* ticket name data*/}
                <p><strong>{ticketData.ticket.name}</strong></p>
              </div>
            </div>
            <div>{/* ticket number */}
              <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Number</small></p></div>
              <div>{/* ticket nuumber data*/}<Link to={`/tickets/${ticketData.ticket.uuid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}><p><strong>{ticketData.ticket.uuid}</strong></p></Link></div>
            </div>
          </div>
      }

      
      
    </>
  )


  
}

// export default function TicketQrcodeDetailsWarpper(){
    
//   return(
//     <>
//     <div>
//     <TicketQrcodeDetails ticketQrcode={ticketQrcode} />
//     </div>
//     </>
    
//   )

// }
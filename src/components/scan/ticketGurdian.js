// TODO: impotr dependences
//       1.import react
import React,{useState} from 'react'
import {queryClient} from '../../App'
import { GetQrcodesQueryById } from '../../features/scan/qrcode.query' //import GetQrcodesQueryById

import {GetQrcodeData} from './getQrcodeData'

import {Link } from "react-router-dom";
import {UpdateTicket} from '../../features/ticket/ticket.api'
import {useMutation} from 'react-query'  //import useMutation



//
// TODO: make function to display ticket details
export function TicketQrcodeDetailsGurdian({ticketQrcode}){
// declear variables
//queryClient.invalidateQueries('qrcode')
const [isUpdate, setIsUpdate] = useState(false)
// declear variable to hold user from query
  let getToken = "13c077b1ba26051d090fefb06578e9ee7969b1b3"

  let ticketUpdate = {}

  const mutation = useMutation(usernfo => UpdateTicket(usernfo), {
    onSuccess: (data, variables) => {
      //queryClient.invalidateQueries('qrcode')
      queryClient.refetchQueries(['qrcode', { uuid: ticketQrcode }])
      // queryClient.setQueryData(['ticket', { uuid: variables.id }], data)
      // queryClient.getQueryData(['ticket',{uuid:variables.id}])
      // console.log("uuis data update: ",queryClient.getQueryData(['ticket',{uuid:variables.id}]))
      // console.log("id update: ",variables)
    },
  })

  //const {data} = GetQrcodesQueryById(ticketQrcode.data,getToken)
  
const {data,isCached} = GetQrcodeData(ticketQrcode.data)



//       make sure to get data object
const getData = data?('status' in data)?data.data:data:data


const ticketData = isCached?getData?.find(d => d.qrcode === ticketQrcode):getData
console.log("FINAL",ticketData)


if(ticketData && ticketData.ticket.validity===true && !isUpdate && getToken){
  ticketUpdate = {
    id:ticketData.ticket.uuid,
    data:{
      validity:false
    },
    token:getToken
  }
  mutation.mutate(ticketUpdate)

  setIsUpdate(true)
}
 

const validatingTicket = () => {
  ticketUpdate = {
    id:ticketData.ticket.uuid,
    data:{
      validity:true
    },
    token:getToken
  }
  UpdateTicket(ticketUpdate)
  setIsUpdate(false)
}

  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      {ticketData && 
    <div style={{margin: "10vh 1vw"}}>
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
                    <div>{/* ticket nuumber data*/}<p><strong>T-{ticketData.ticket.extral_info.Table}</strong></p></div>
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
      
      <button onClick={validatingTicket}>Boop!</button>
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
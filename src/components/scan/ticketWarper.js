// TODO: impotr dependences
//       1.import react
import React,{useState} from 'react'
//       2. import queryClient
import {queryClient} from '../../App'
//       3. import GetQrcodesQueryById

import {AddScanlog, GetQrcodeById} from '../../features/scan/qrcode.api' //import tickets feching function



import {Link } from "react-router-dom";

import {GetQrcodeData} from './getQrcodeData'

import Sound from './playSound'

import {useMutation} from 'react-query'  //import useMutation
import {GetTicketById, UpdateTicket, GetTicketByQrcode} from '../../features/ticket/ticket.api'



//
// TODO: make function to display ticket details
export function TicketQrcodeDetails({ticketQrcode,isScan}){
// declear variables
//console.log("isScan: ",isScan)
const [isUpdate, setIsUpdate] = useState(isScan)
const [log, setLog] = useState(isScan)
const [updating, setUpdating] = useState('')
//console.log("isUpdate: ",isUpdate)
  let ticketUpdate = {}
  const {ticketData,isError,error,isLoading,isCached} = GetQrcodeData(ticketQrcode)
  
  const mutation = useMutation(usernfo => UpdateTicket(usernfo),{
    onMutate: () => {
        setUpdating('updating...')
        setIsUpdate(!isScan)   
    },
    onSuccess: async (data) => {
      // await queryClient.fetchQuery(['ticket_qrcode',data.data.qrcode],
      // ()=>GetTicketByQrcode(data.data.qrcode,localStorage.getItem('token')))
      await queryClient.setQueryData(['ticket_qrcode',data.data.qrcode], data)
      setUpdating('updated')
      setIsUpdate(isScan)     
    },
    onError: (error) => {
      setUpdating('Update Error: ',error)
    }
  })

  const logMutation = useMutation(logInfo => AddScanlog(logInfo),{
    // onSuccess: () => {
    //   queryClient.fetchQuery(['ticket',ticketData.qrcode],
    //   ()=>GetTicketById(ticketData.qrcode,localStorage.getItem('token')))
    // }
  })




//console.log('Final: ',ticketData)

if(ticketData){
  
}


if (isLoading)//console.log("loading...")

if (isLoading) {
  return <span>Loading...</span>
}
if (isError) {
  //console.log("status: ",error.response)
  return (<>
    <Sound ticketData={false}/> 
    <div className={`${error?.response?.status===404?"bg-dark":"bg-warning "} h-auto w-100 d-flex justify-content-center`}>
      <div className="text-white">{`${error?.response?.status===404?'Foreign':`${error}`}`}</div>
    </div>
    <div className="">{ticketQrcode}</div>
    
  </>
  )
}

if (ticketData){
  let alart
  alart = ticketData.validity===true?<Sound ticketData={true}/>:<Sound ticketData={false}/>
 
  //console.log("log :::",log)

if(log){
  //console.log("log")
  const today = new Date(),
  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const scanLog = {
    "status_recorded":ticketData.validity===true?'P':'E',
    "ticket":`${ticketData.uuid}`,
    "scan_time":time,
  }
  logMutation.mutate(scanLog)
  setLog(!isScan)
}
  
//console.log("check===>",ticketData.validity===true)
  if(ticketData.validity===true && isUpdate && localStorage.getItem('token'))
  {
    ticketUpdate = {
    id:ticketData.tid,
    data:{
      validity:false
    },
    token:localStorage.getItem('token')
  }
  //console.log("isUpdate===>",ticketData.validity)
  setIsUpdate(!isScan)
  mutation.mutate(ticketUpdate,{
    onSettled:()=>{
      //setIsUpdate(isScan)
    }
  })
  setIsUpdate(!isScan)

  
  //console.log("isUpdate :::",isUpdate)
}


  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      
    <div style={{margin: "10vh 1vw"}}>
      {/* {alart} */}
      <p>{isUpdate?'':`${updating}`}</p>
      <div className={`${ticketData.validity===true?"bg-success":"bg-danger"} h-auto w-100 d-flex justify-content-center`}>
        {ticketData.validity===true?"valid":"expired"}
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
                <div className="Category-warper">
                    <div>{/* ticket category data*/}<p><strong>{ticketData.category.name}</strong></p></div>
                </div>
                <div className="Extra-warper">
                    <div>{/* ticket nuumber data*/}<p><strong>T-{ticketData.table}</strong></p></div>
                </div>
            </div>
          </div>
      </div>

      <div>{/* ticket name */}
        <div>{/* ticket name tage*/}
          <p className="m-0"><small>Name</small></p>
        </div>
        <div>{/* ticket name data*/}
          <p><strong>{ticketData.name}</strong></p>
        </div>
      </div>
      <div>{/* ticket number */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Number</small></p></div>
        <div>{/* ticket nuumber data*/}<Link to={`/tickets/${ticketData.tid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}><p><strong>{ticketData.tid}</strong></p></Link></div>
      </div>
    </div>
      
      
    </>
  )
}

return(
  <div>nothing</div>
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
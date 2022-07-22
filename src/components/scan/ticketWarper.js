// TODO: impotr dependences
//       1.import react
import React,{useState, useEffect, useMemo} from 'react'
//       2. import queryClient
import {queryClient} from '../../index'
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
const [isUpdate, setIsUpdate] = useState(isScan)
const [log, setLog] = useState(isScan)
const [updating, setUpdating] = useState('')
const [ dataTicket, setDataTicket ] = useState(null)
const [ validity, setValidity ] = useState()

  let ticketUpdate = {}
  const auth = queryClient.getQueryData(['user'])
  const permissions = useMemo(() => {
    const getPermissions = (user) => {
      const userGroups = user.data.groups;
      const checkerPermissions = obj => obj.codename === "change_checked_status";
      const validityPermissions = obj => obj.codename === "change_validity_status";
      return {
        validity:userGroups.map(el => el.permissions.some(validityPermissions)).includes(true),
        checked:userGroups.map(el => el.permissions.some(checkerPermissions)).includes(true)
      }
   
    }
    return getPermissions(auth)
  },[])
  console.log('permissions',permissions)
  const {ticketData,isError,error,isLoading,isFetched,data} = GetQrcodeData(ticketQrcode)
  const mutation = useMutation(usernfo => UpdateTicket(usernfo),{
    onMutate: () => {
        setUpdating('updating...')
        setIsUpdate(!isScan)
    },
    onSuccess: (data) => {
      setDataTicket({...dataTicket,validity:false})
      setUpdating('updated')
      
    },
    onError: (error) => {
      setUpdating('Update Error: ',error)
    },
    onSettled: () => {
      setIsUpdate(isScan)

    }
  })

  const logMutation = useMutation(logInfo => AddScanlog(logInfo))

  useEffect(() => {
    if(ticketData){
      setDataTicket(ticketData)
      setValidity(ticketData.validity)
      setUpdating('')
    }
  }, [ticketData])

if (isLoading) {
  return <span>Loading...</span>
}
if (isError) {
  return (<>
    <Sound ticketData={false}/> 
    <div className={`${error?.response?.status===404?"bg-dark":"bg-warning "} h-auto w-100 d-flex justify-content-center`}>
      <div className="text-white">{`${error?.response?.status===404?'Foreign':`${error}`}`}</div>
    </div>
    <div className="">{ticketQrcode}</div>
    
  </>
  )
}

if (dataTicket){
  let alart
  // if(dataTicket.validity===true)alart=<Sound dataTicket={true}/>
  // if(dataTicket.validity===false)alart=<Sound dataTicket={false}/>
  alart = dataTicket.validity===true?<Sound dataTicket={true}/>:<Sound dataTicket={false}/>
 
if(log){
  const today = new Date(),
  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const scanLog = {
    "status_recorded":dataTicket.validity===true?'P':'E',
    "ticket":`${dataTicket.uuid}`,
    "scan_time":time,
  }
  logMutation.mutate(scanLog)
  setLog(!isScan)
}
  
  if(dataTicket.validity===true && isUpdate && localStorage.getItem('token') && permissions.validity)
  {
    ticketUpdate = {
    id:dataTicket.tid,
    data:{
      validity:false,
      is_checked:true
    },
    token:localStorage.getItem('token')
  }
  mutation.mutate(ticketUpdate)
  setIsUpdate(!isScan)
}


  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      
    <div style={{margin: "10vh 1vw"}}>
      {/* {alart} */}
      <p>{updating}</p>
      {/* <button className={`btn btn-labeled btn-primary mb-3 ${isUpdate && updating==='updated'?'':'d-none'}`} disabled={!validity} onClick={()=>setValidity(dataTicket.validity)}>confirm</button> */}
      {permissions.validity===true && <div className={`${dataTicket.validity===true?"bg-success":"bg-danger"} h-auto w-100 d-flex justify-content-center`}>
        {dataTicket.validity===true?"valid":"expired"}
      </div>}
      {permissions.checked===true && <div className={`${dataTicket.is_checked===true?"bg-primary":"bg-danger"} h-auto w-100 d-flex justify-content-center`}>
        {dataTicket.is_checked===true?"checked":"not checked"}
      </div>}
      <div className="row">
        <div className="col-9">{/* event name */}
          <div className="ticket-warper">{/* ticket event warper*/}
            <div>{/* event name tage*/}
            <p className="m-0"><small>Event</small></p>
            </div>
            <div>{/* event name data*/}
              <p><strong>{dataTicket.category.event.name}</strong></p>
            </div>
            </div>
        </div>
        <div className="col d-flex justify-content-end">{/* ticket date */}
            <div className="ticket-warper">{/* ticket date warper*/}
                <div className="Category-warper">
                    <div>{/* ticket category data*/}<p><strong>{dataTicket.category.name}</strong></p></div>
                </div>
                <div className="Extra-warper">
                    <div>{/* ticket nuumber data*/}<p><strong>T-{dataTicket.table}</strong></p></div>
                </div>
            </div>
          </div>
      </div>

      <div>{/* ticket name */}
        <div>{/* ticket name tage*/}
          <p className="m-0"><small>Name</small></p>
        </div>
        <div>{/* ticket name data*/}
          <p><strong>{dataTicket.name}</strong></p>
        </div>
      </div>
      <div>{/* ticket number */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Number</small></p></div>
        <div>{/* ticket nuumber data*/}<Link to={`/tickets/${dataTicket.tid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}><p><strong>{dataTicket.tid}</strong></p></Link></div>
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
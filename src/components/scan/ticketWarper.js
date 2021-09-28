// TODO: impotr dependences
//       1.import react
import React,{useState,useEffect} from 'react'
//       2. import queryClient
import {queryClient} from '../../App'
//       3. import GetQrcodesQueryById

import {CheckTicket} from './updateTicket'

import error_mp3 from '../../assets/sounds/ES_MM_Error.mp3';
import valid_mp3 from '../../assets/sounds/ES_Multimedia.mp3';

import {Link } from "react-router-dom";

import {GetQrcodeData} from './getQrcodeData'

import Sound from './playSound'

import {useMutation} from 'react-query'  //import useMutation
import {UpdateTicket} from '../../features/ticket/ticket.api'


//
// TODO: make function to display ticket details
export function TicketQrcodeDetails({ticketQrcode}){
// declear variables
const [isUpdate, setIsUpdate] = useState(false)
// declear variable to hold user from query
  let getUser

  let updateTicketeffect = {}
  const mutation = useMutation(usernfo => UpdateTicket(usernfo))

// get user query key
  const userqueryKey = "user"


const {data,isCached} = GetQrcodeData(ticketQrcode)

//       make sure to get data object
const getData = data?('status' in data)?data.data:data:data

//       if data holder hold cached data find ticket by uuid
const ticketData = isCached?getData?.find(d => d.qrcode === ticketQrcode):getData
console.log("FINAL",ticketData)


//ticketData?setIsData(true):setIsData(false)

// if(ticketData && ticketData.ticket.validity===true && !isUpdate){
//   updateTicket = {
//     id:ticketData.ticket.uuid,
//     data:{
//       validity:false
//     },
//     token:localStorage.getItem('token')
//   }
//   mutation.mutate(updateTicket)
//   setIsUpdate(true)
// }

    const validSound= new Audio(valid_mp3) //useSound(valid_mp3)
    const erroreSound= new Audio(error_mp3) //useSound(error_mp3)

    //validSound.muted = true
    //erroreSound.muted = true

    const playValidSound = () => {
        const playPromise = validSound.play()
      
            if (playPromise !== undefined) {
              playPromise
                .then(_ => {
                  console.log("valid played auto");
                })
                .catch(error => {
                  console.log("valid playback prevented");
                });
            }
      
      }
      const playErrorSound = () => {
        const playPromise = erroreSound.play()
      
            if (playPromise !== undefined) {
              playPromise
                .then(_ => {
                  console.log("error played auto");
                })
                .catch(error => {
                  console.log("error playback prevented");
                });
            }
      
      }
      const playHandler = () => {
        ticketData && ticketData.ticket.validity===true?playValidSound():playErrorSound()
      }
      
      playHandler()
      
const checkTicket = () => {
  Sound(ticketData)
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
      
      <button onClick={playHandler}>Boop!</button>
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
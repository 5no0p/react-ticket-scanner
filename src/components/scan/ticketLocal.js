import React, { useState } from 'react'

import {Link } from "react-router-dom";

export function TicketLocalQrcodeDetails({ticketQrcode,isScan}){

    const [validity, setValidity] = useState(false)
 
    const ticketData = JSON.parse(localStorage.getItem('updated_tickets'))?.find(obj => obj.qrcode === ticketQrcode)?JSON.parse(localStorage.getItem('updated_tickets')).find(obj => obj.qrcode === ticketQrcode):JSON.parse(localStorage.getItem('tickets_file'))?.find(obj => obj.qrcode === ticketQrcode)
    console.log("local ticket: ",JSON.parse(localStorage.getItem('updated_tickets')).find(obj => obj.qrcode === ticketQrcode))
    console.log("validity: ",validity)
   

    const update = () => {
        if(ticketData.validity===true && localStorage.getItem('token')){
            let ticket_update = JSON.parse(localStorage.getItem('updated_tickets'))??[]
            const update = JSON.parse(localStorage.getItem('tickets_file'))?.find(obj => obj.qrcode === ticketData.qrcode)
            update.validity = false
            ticket_update.push(update)
            localStorage.setItem('updated_tickets',JSON.stringify(ticket_update))


            // localStorage.getItem('updated_tickets')?JSON.parse(localStorage.getItem('updated_tickets')).push(update):localStorage.setItem('updated_tickets',JSON.stringify(update))
            setValidity(true)
            console.log("updte")
        }
    }
    if (ticketData){
    return(
        <>
        
        <div style={{margin: "10vh 1vw"}}>
            {ticketData.validity===true
                ?  <div className="mt-3">
                        <button className={`btn btn-labeled btn-primery`}style={{ marginBottom: '10px' }} onClick={update}>
                        Update Ticket 
                        {/* <span className="btn-label"><i className="fa fa-whatsapp"></i></span> */}
                        </button>
                     </div>
                :null
            }
        
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
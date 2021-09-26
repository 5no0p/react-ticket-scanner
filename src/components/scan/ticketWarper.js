// TODO: impotr dependences
//       1.import react
import React from 'react'
//       2. import queryClient
import {queryClient} from '../../App'
//       3. import GetQrcodesQueryById
import { GetQrcodesQueryById } from '../../features/scan/qrcode.query';


//
// TODO: make function to display ticket details
export function TicketQrcodeDetails({ticketQrcode}){
// TODO: declear variables

//      2. declear variable to check cached data
  let isCached = true
//      3. declear variable to hold data from query
  let getData
//      4.get qrcodes query key
  const queryKey = "qrcodes"
//      
// TODO: check if data is in query cache, if not make api request
//      1.get data from cached qrcodes query if undefine gi step 2
if(queryClient.getQueryData(queryKey) !== undefined){
//      get the data object from cached query  
  const {data} = queryClient.getQueryData(queryKey)
//      hold the data object to data holder
  getData = data
  console.log("data from cashe",getData)
//      2. make api request to get ticket details
}else{
//      no cached data
  isCached = false
//       send api with ticket uuiid
  const {data} = GetQrcodesQueryById(ticketQrcode)
//       hold the data object in data holder
  getData = data
  console.log("data from api",getData)
}

//       make sure to get data object
const data = getData?('status' in getData)?getData.data:getData:getData

//       if data holder hold cached data find ticket by uuid
const ticketData = isCached?data?.find(d => d.qrcode === ticketQrcode):data
console.log("FINAL",ticketData)
 
  return(
    <>
      {/* Ticket details
        UX design url: https://www.figma.com/file/M5CnBCxxjH0MxXmfeuslbY/Ticket-QRcode-Scanner?node-id=42%3A16
        FRAME : Ticket Details
      */}
      {ticketData && 
      <div style={{marginTop:"3.75rem"}}>
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
              <div>{/* ticket date tage*/}
                <p className="m-0"><small>Date</small></p>
              </div>
              <div>{/* ticket date data*/}
              {/* <p><strong>{new Intl.DateTimeFormat('en-GB', {month:'short',day:'2-digit'}).format(new Date(ticketData.payment_info.purchased_at))}</strong></p> */}
              </div>
            </div>
          </div>
      </div>

      <div className="row">
        <div className="col-9">{/* ticket payment */}
          <div className="ticket-warper">{/* ticket Payment warper*/}
            <div>{/* ticket payment tage*/}<p className="m-0"><small>Payment</small></p></div>
            <div>{/* ticket payment data*/}
            {/* <p><strong>{ticketData.payment_info.amount_of_payment}</strong></p> */}
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-end">{/* ticket category */}
          <div className="ticket-warper">{/* ticket category warper*/}
            <div>{/* ticket category tage*/}<p className="m-0"><small>Category</small></p></div>
            <div>{/* ticket category data*/}<p><strong>{ticketData.ticket.category.name}</strong></p></div>
          </div>
        </div>
      </div>

      <div>{/* ticket name */}
        <div>{/* ticket name tage*/}
          <p className="m-0"><small>Name</small></p>
        </div>
        <div>{/* ticket name data*/}
        <p><strong>{ticketData.ticket.name}</strong></p>
        </div></div>
      <div>{/* ticket number */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Number</small></p></div>
        <div>{/* ticket nuumber data*/}<p><strong>{ticketData.ticket.uuid}</strong></p></div>
      </div>

      <div>{/* ticket more details */}
        <div>{/* ticket nuumber tage*/}<p className="m-0"><small>Table</small></p></div>
        <div>{/* ticket nuumber data*/}<p><strong>{ticketData.ticket.extral_info.Table}</strong></p></div>
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
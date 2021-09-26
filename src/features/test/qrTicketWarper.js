import React from 'react'
//       3. import useParams
import {useParams} from "react-router-dom";
import {TicketQrcodeDetails} from '../../components/scan/ticketWarper'

export default function TicketQrcodeDetailsWarpper(){
     //      1.get the ticket uuid
    let { qrcode } = useParams();
    return(
      <>
      <div>
      <TicketQrcodeDetails ticketQrcode={qrcode} />
      </div>
      </>
      
    )
  
  }
import React from 'react'
//       3. import useParams
import {useParams} from "react-router-dom";
import {TicketQrcodeDetailsGurdian} from '../../components/scan/ticketGurdian'

export default function TicketQrcodeDetailsWarpper(){
     //      1.get the ticket uuid
    let { qrcode } = useParams();
    const qr = {
      data:qrcode,
      token:"13c077b1ba26051d090fefb06578e9ee7969b1b3"
    }
    return(
      <>
      <div>
      <TicketQrcodeDetailsGurdian ticketQrcode={qr} />
      </div>
      </>
      
    )
  
  }
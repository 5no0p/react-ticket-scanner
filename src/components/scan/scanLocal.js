import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {TicketQrcodeDetails} from './ticketWarper'
import Alerts from './playMount'
import Sound from './playSound'
import { queryClient } from '../../App'
import { GetTicketByQrcode } from '../../features/ticket/ticket.api'
import { TicketLocalQrcodeDetails } from './ticketLocal'





class ScanLocal extends Component {
  state = {
    result: 'No result',
    iScan: false,
  }

  handleScan = data => {
    if (data) {
      this.setState({
        isSane:true,
        result: data,
      })
      console.log("scan: ",this.state.isSane)
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <>
      <div className="mt-5 container d-flex flex-column min-vh-25 justify-content-center align-items-center">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '50vh' }}
          
        />
      </div>
      <div className="mt-4">
        {this.state.result==="No result"
        ?<p>{this.state.result}</p>
        :<div className="mx-2">
         {/* <Sound ticketData={true}/> */}
         {this.state.isSane
         ?
         (<>
         <Sound ticketData={true}/> 
         <TicketLocalQrcodeDetails ticketQrcode={this.state.result} isScan={this.state.isSane}/>
         </>)
         :''}
          </div>
        }
      </div>
      
      </>
    )
  }
}

export default ScanLocal;
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {TicketQrcodeDetails} from './ticketWarper'
import Alerts from './playMount'
import Sound from './playSound'





class Scan extends Component {
  state = {
    result: 'No result',
    iScan: false,
    delayTime: true,

  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        isSane:!this.state.isSane,
      })
      // setTimeout(() => {
      //   this.setState({
      //     isSane:false,
      //     delayTime:false
      //   })
      // }, 500)
      console.log("scan: ",this.state.isSane)
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <>
      <div className="mt-5">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
      </div>
      <div className="mt-4">
        {this.state.result==="No result"
        ?<p>{this.state.result}</p>
        :<div className="mx-2">
         <Sound ticketData={true}/>
         <TicketQrcodeDetails ticketQrcode={this.state.result} isSane={this.state.isSane}/>
          </div>
        }
      </div>
      
      </>
    )
  }
}

export default Scan;
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {TicketQrcodeDetails} from './ticketWarper'

class Scan extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
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
      <div className="mt-3">
        {this.state.result==="No result"
        ?<p>{this.state.result}</p>
        :<div className="mx-5"><TicketQrcodeDetails ticketQrcode={this.state.result} /></div>
        }
      </div>
      
      </>
    )
  }
}

export default Scan;
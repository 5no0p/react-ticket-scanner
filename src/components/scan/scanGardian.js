import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {TicketQrcodeDetailsGurdian} from './ticketGurdian'

class ScanGuardian extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: {
          data:data,
          token:"13c077b1ba26051d090fefb06578e9ee7969b1b3"
        }
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
      <div className="mt-4">
        {this.state.result==="No result"
        ?<p>{this.state.result}</p>
        :<div className="mx-2">
            <TicketQrcodeDetailsGurdian ticketQrcode={this.state.result} />
          </div>
        }
      </div>
      
      </>
    )
  }
}

export default ScanGuardian;
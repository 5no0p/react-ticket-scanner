import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

const Scan = () => {
    const [result,setResult] = useState('No result')
    

    const handleScan = data => {
    if (data) {
        setResult({data})
    }
  }
  const handleError = err => {
    console.error(err)
  }

    return (
      <div>
        <QrReader
          delay={300}
          onError={e=>handleError(e)}
          onScan={e=>handleScan(e)}
          style={{ width: '100%' }}
        />
        <div>{result}</div>
      </div>
    )
}

export default Scan;
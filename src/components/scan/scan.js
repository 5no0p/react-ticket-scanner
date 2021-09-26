import React, { useState,useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { useAlert } from 'react-alert'

const Scan = () => {
    const [result,setResult] = useState('No result')
    const [loading, setLoading] = useState(true)
    const alert = useAlert()

    useEffect(()=>{
      alert.show("data")
    },[])

    const handleScan = data => {
    if (data) {
        setResult({data},
        alert.show(data)
          
          )
    }
  }
  const handleError = err => {
    console.error(err)
  }

  const handleLoad = () => {
    setLoading(false)
    console.log(loading)
  }

    return (
      <div>
        <p>QR code scanner</p>
        <QrReader
          delay={300}
          onError={e=>handleError(e)}
          onScan={e=>handleScan(e)}
          onLoade={()=>handleLoad()}
          style={{ width: '100%' }}
        />
        <div>{result}</div>
      </div>
    )
}

export default Scan;
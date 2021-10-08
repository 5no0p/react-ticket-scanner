//       1.import react
import React, { createRef, useState } from 'react'
//       2. import QR code generator
import QRCode from "react-qr-code";
//       3. import queryClient
import {queryClient} from '../../App'
//       4. import useParams
import {Link, useParams} from "react-router-dom";
//       5. import TicketByIdQuery
import { TicketByIdQuery } from '../../features/ticket/ticket.query';
import Spinner from '../../components/common/spinner';//import spinner
import { useScreenshot } from 'use-react-screenshot'
import { copyImageToClipboard } from 'copy-image-clipboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateTicket } from '../../features/ticket/ticket.api';
import { useMutation } from 'react-query';


//
export function TicketGeneral(){
const [number, setNumber] = useState('')
const [message, setMessage] = useState('')
const [copyNotify, setCopyNotify] = useState(false)
const [takeImage, setTakeImage] = useState(false)
const [updating, setUpdating] = useState('')
const ref = createRef(null)
const [image, takeScreenshot] = useScreenshot()
//      1.get the ticket uuid
  let { ticketUuid } = useParams();
//      2. declear variable to check cached data
  let isCached = true
//      3. declear variable to hold data from query
  let getData,getIsLoading,getIsError,getEerror
//      4.get tickets query key
  const queryKey = "tickets"
//      

const mutation = useMutation(usernfo => UpdateTicket(usernfo),{
  onMutate: () => {
      setUpdating('updating...')
         
  },
  onSuccess: async (data) => {
    await queryClient.setQueryData(['ticket',data.data.tid], data)
    setUpdating('updated')     
  },
  onError: (error) => {
    setUpdating('Update Error: ',error)
  }
})
//      1.get data from cached tickets query if undefine gi step 2
if(queryClient.getQueryData(queryKey) !== undefined){

//      get the data object from cached query  
  const {isLoading, isError, data, error} = queryClient.getQueryData(queryKey)
//      hold the data object to data holder
  getData = data
  getData = data
  getIsLoading=isLoading
  getIsError=isError
  getEerror=error
  console.log("data from cashe",getData)
//      2. make api request to get ticket details
}else{
//      no cached data
  isCached = false
//       send api with ticket uuiid
  const {isLoading, isError, data, error} = TicketByIdQuery(ticketUuid)
//       hold the data object in data holder
  getData = data
  getData = data
  getIsLoading=isLoading
  getIsError=isError
  getEerror=error
  console.log("data from api",getData)
}

//       make sure to get data object
const data = getData?('status' in getData)?getData.data:getData:getData

//       if data holder hold cached data find ticket by uuid
const ticketData = isCached?data?.find(d => d.tid === ticketUuid):data
console.log("FINAL",ticketData)

//if(ticketData?.phone){setNumber(ticketData.phone)}

const getImage = async () => {
  takeScreenshot(ref.current)
  setTakeImage(true)
}

const updateSend = () => {
  let ticketUpdate = {
    id:ticketData.tid,
    data:{
      isSend:true
    },
    token:localStorage.getItem('token')
  }
  mutation.mutate(ticketUpdate)

}
console.log('phone',ticketData?.phone.length)

const URL = 'https://wa.me';

if(takeImage){
  if(image)
  copyImageToClipboard(image)
      .then(() => {
      console.log('Image Copied')
      setNumber(ticketData.phone.substr(1,ticketData.phone.length));
      let url = `${URL}/${number}`;
      if (message) {
        url += `?text=${encodeURI(message)}`;
      }
      if(ticketData.phone.length<10){
        setCopyNotify(true)
      }else{
        window.open(url)
      }
      })
      .catch((e) => {
      console.log('Error: ', e.message)
      })
}

 
  return(
    <>      
      {getIsLoading && 
        <>
           <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
             <Spinner />
           </div>
        </>
      }
      {getIsError &&
        <>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <span>Error: {getEerror.message}</span>
        </div>
     </>
      }
      {ticketData && 
     
      <>
      <div className="container">
        <div className="mt-3">
          <button className={`btn btn-labeled btn-success`}style={{ marginBottom: '10px' }} onClick={getImage}>
          Send Screenshot <span className="btn-label"><i className="fa fa-whatsapp"></i></span>
          </button>
          <span><p>{copyNotify?"Copied to Clipboard":""}</p></span>
          <button className={`btn btn-labeled btn-primary`}style={{ marginBottom: '10px' }} onClick={updateSend}>
          Confirm
          </button>
          <span><p>{updating}</p></span>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center"style={{marginTop:"3.75rem"}}>
          <div className="card" ref={ref}>
          <div className="card-header text-center">
          {ticketData.category.event.name}
          </div>
          <div className="d-flex justify-content-center my-4"><QRCode value={ticketData.qrcode}/></div>
            <div className="card-body text-center">
              <h5 className="card-title" style={{backgroundColor:`${ticketData.category.color}`,color:'white'}}>
                {ticketData.category.name}</h5>
                <h5 className="card-text">{ticketData.name}</h5>
                <Link to={`/tickets/${ticketData.tid}/details`} style={{ textDecoration: 'none',color: 'inherit', }}>
                <p className="card-text">{ticketData.tid}</p></Link>
              
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
            <div className="card-footer text-muted">
              T-<strong>{ticketData.table}</strong>
            </div>
          </div>
        
      </div>
    </div>
    </>
      }
      
    </>
  )
}

export default function TicketGeneralWarpper(){

  return(
    <>
    <div>
    <TicketGeneral />
    <ToastContainer />

    </div>
    </>
    
  )

}
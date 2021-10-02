// TODO: impotr dependences
//       1.import react
import React from 'react'
//       2. import QR code generator
//       3. import queryClient
import {queryClient} from '../../App'
//       4. import useParams
import {Link, useParams} from "react-router-dom";
//       5. import TicketByIdQuery
import Spinner from '../../components/common/spinner';//import spinner
import { EventByIdQuery } from '../../features/event/event.query';

//
// TODO: make function to display ticket details
export function EventGeneral(){
// TODO: declear variables
//      1.get the ticket uuid
  let { eventUuid } = useParams();
//      2. declear variable to check cached data
  let isCached = true
//      3. declear variable to hold data from query
  let getData,getIsLoading,getIsError,getEerror
//      4.get tickets query key
  const queryKey = "tickets"
//      
// TODO: check if data is in query cache, if not make api request
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
  const {isLoading, isError, data, error} = EventByIdQuery(eventUuid)
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
const eventData = isCached?data?.find(d => d.uuid === eventUuid):data
console.log("FINAL",eventData)
let startAt = new Intl.DateTimeFormat('en-GB', {month:'short',day:'2-digit'}).format(new Date(JSON.parse(eventData.active_in).lower))
let endIn = new Intl.DateTimeFormat('en-GB', {month:'short',day:'2-digit'}).format(new Date(JSON.parse(eventData.active_in).upper))

 
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
      {eventData && 
      <div style={{marginTop:"3.75rem"}}>
        <div className="card">
        <div className="card-header text-center">
            {startAt} - {endIn}
        
        </div>
          <div className="card-body text-center">
            <h5 className="card-title">{eventData.name}</h5>
            <p className="card-text">{eventData.discripton}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          </div>
          <div className="card-footer text-muted">
            by-<strong>{eventData.owner.username}</strong>
          </div>
        </div>
      
    </div>
    
      }
      
    </>
  )
}

export default function EventGeneralWarpper(){

  return(
    <>
    <div>
    <EventGeneral />
    </div>
    </>
    
  )

}
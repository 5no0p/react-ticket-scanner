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

import { CategoriesEventQuery } from '../../features/category/category.query';

import '../../App.css'


export function EventTickets(){

  let { eventUuid } = useParams();
  console.log("event id => ",eventUuid)

const {isLoading, isError, data, error} = CategoriesEventQuery(eventUuid)

if(isLoading){console.log("Loading...")}

if(!isLoading){console.log("Stop Loading...")}


const eventData = data?('status' in data)?data.data:data:data


console.log("FINAL",eventData)
 
  return(
    <>      
      {isLoading &&
        <>
           <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
             <Spinner />
           </div>
        </>
      }
      {isError &&
        <>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <span>Error: {error.message}</span>
        </div>
     </>
      }
      {eventData && 
      <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-5 justify-content-center" style={{marginTop:"3.75rem",
                                                                      boxSizing: "border-box"}}>
          {eventData?.map((category) => (
          <div className="card mx-1" key={category.name} style={{borderColor:`${category.color}`}}>
              <div className="card-header text-center text-light" style={{borderColor:`${category.color}`,
                                                                  backgroundColor:`${category.color}`}}>
                  {category.event.name}
              </div>
              <div className="card-body d-flex justify-content-between text-center" style={{color:`${category.color}`}}>
                  <h5 className="card-title">{category.name}</h5>
                  <h5 className="card-title">{category.price}</h5>
              </div>
              <div><p className="card-body card-text ">{category.discripton}</p></div>
              <Link to={"#"} style={{ textDecoration: 'none',color: 'inherit', }}>
                <div className="card-footer bg-transparent text-center" style={{borderColor:`${category.color}`}}>
                  Buy 
                </div></Link>
          </div>
              
          ))}
        </div>
      </div>     
      </>
    
      }
      
    </>
  )
}

export default function EventTicketsWarpper(){

  return(
    <>
    <div>
    <EventTickets />
    </div>
    </>
    
  )

}
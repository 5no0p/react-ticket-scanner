import React from 'react';//import react
import {Link} from "react-router-dom";//import Link
import Spinner from '../../components/common/spinner';//import spinner
import {EventsQuery } from '../../features/event/event.query';
 
//
// TODO: make function to display events list
export const EventsList = () => {
  // TODO: get the data from the query
  //       the data from query are {isLoading, isFetching, data, error}
  const { isLoading, isFetching, isError, data, error } = EventsQuery();
  // TODO: extract events data
  //       some times {data} is'n the event data so we should be sure we have the events data
  const eventsData = data ? ('status' in data ? data.data : data) : data;

  // TODO: checking the status and console log it
  //       1.check if is loading, true: console log ("Loading..."), false: go step 2
  isLoading
    ? console.log('Loading...')
    : //       2.check if is feching, true: console log ("Feching..."), false: go step 3
    isFetching
    ? console.log('Feching...')
    : //       3.check if is data, true: console log ("Data: ",data), false: go step 4
    data
    ? console.log('Data: ', data)
    : //       4.check if is error, true: console log ("Error: ",error), false: console.log('nothing!!!')
    error
    ? console.log('Error: ', error)
    : console.log('nothing!!!');
    
  return (
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
      {eventsData && 
            <>
              <div className="container" style={{marginTop:"3.75rem"}}>Events Page</div>
              <div>
                {eventsData?.map((event) => (
                  <ul key={event.uuid}>
                    <li>number: <Link to={`/events/${event.uuid}`}>{event.uuid}</Link></li>
                    <li>name: {event.name}</li>
                    <li>date: {
                        new Intl.DateTimeFormat('en-GB', {month:'short',day:'2-digit'}).format(new Date(JSON.parse(event.active_in).lower))
                    }
                    </li>
                    <li>discripton: {event.discripton}</li>
                  </ul>
                ))}
              </div>
            </>
      }

    </>
  );
};
//

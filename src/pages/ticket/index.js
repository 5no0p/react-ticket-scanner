import React,{useState} from 'react';//import react
import {Link} from "react-router-dom";//import Link
import { TicketsQuery,TicketByPageQuery } from '../../features/ticket/ticket.query';//import tickers query
import Navbar from '../../components/navbar';//import navbar 
import Spinner from '../../components/common/spinner';//import spinner
 
//
// TODO: make function to display tickers list
export const TicketsList = () => {
  const [page, setPage] = useState(1)

  // TODO: get the data from the query
  //       the data from query are {isLoading, isFetching, data, error}
  const { isLoading, isFetching, isError, data, error } = TicketByPageQuery(page);
  // TODO: extract tickets data
  //       some times {data} is'n the ticket data so we should be sure we have the tickets data
  const ticketsData = data ? ('status' in data ? data.data : data) : data;
  console.log(ticketsData)

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
      {ticketsData && 
            <>
              <div className="container" style={{marginTop:"3.75rem"}}>Tickets Page</div>
              <div className="mx-5 justify-content-center">
              <table className="table table-striped">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Validity</th>
                      </tr>
                    </thead>
                    <tbody>
                {ticketsData?.results.map((ticket) => (
                  <tr className="text-center" key={ticket.tid}>
                    <td><Link to={`/tickets/${ticket.tid}`} style={{ textDecoration: 'none',color: 'inherit', }}>{ticket.tid}</Link></td>
                    <td>{ticket.name}</td>
                    <td>{ticket.category.name}</td>
                    <td>{ticket.validity ? 'valid' : 'expierd'}</td>
                  </tr>
                ))}
                </tbody>
                </table>
              </div>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                  <button type="button" className="btn btn-primary"aria-hidden="true" onClick={() => {
                  if(ticketsData.previous)
                  setPage(old => Math.max(old - 1, 0))
                  }}
                disabled={page === 1}>&laquo;</button>
                  <button type="button" className="btn btn-primary">{page}</button>
                  {/* <button type="button" className="btn btn-primary">3</button> */}
                  <button type="button" className="btn btn-primary" disabled={ticketsData.next===null} aria-hidden="true" onClick={() => {
                  if (ticketsData.next) {
                    setPage(old => old + 1)
                  }
                }}>&raquo;</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                {isFetching ? <Spinner />: null}{' '}
                </div>
              </div>
            </>
      }

    </>
  );
};
//

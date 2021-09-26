// TODO: import dependences
//       1.import react
import React from 'react';
//        import Link
import {Link} from "react-router-dom";
//       2.import tickers query
import { TicketsQuery } from '../../features/ticket/ticket.query';
//       3.import navbar
import Navbar from '../../components/navbar'
//
// TODO: make function to display tickers list
export const TicketsList = () => {
  // TODO: get the data from the query
  //       the data from query are {isLoading, isFetching, data, error}
  const { isLoading, isFetching, data, error } = TicketsQuery();
  // TODO: extract tickets data
  //       some times {data} is'n the ticket data so we should be sure we have the tickets data
  const ticketsData = data ? ('status' in data ? data.data : data) : data;

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
      <div>
      <Navbar />
      </div>
      <div className="" style={{marginTop:"3.75rem"}}>Tickets Page</div>
      <div>
        {ticketsData?.map((ticket) => (
          <ul key={ticket.uuid}>
            <li>number: <Link to={`/tickets/${ticket.uuid}`}>{ticket.uuid}</Link></li>
            <li>name: {ticket.name}</li>
            <li>category: {ticket.category.name}</li>
            <li>valid: {ticket.validity ? 'valid' : 'expierd'}</li>
          </ul>
        ))}
      </div>
    </>
  );
};
//

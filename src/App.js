import React from 'react'
import {useQuery} from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import {TicketsList} from './pages/ticket/index'
import TicketDetailsWarpper from './pages/ticket/ticketDetails'
import TicketGeneralWarpper from './pages/ticket/ticketGeneral'
import Websoket from './features/test/websoket'
import Auth from './features/test/authTest'
import Scan from './components/scan/scan'
import Home from './components/home'
import ScanGuardian from './components/scan/scanGardian'
import Navbar from './components/navbar'
import {Login} from './components/login/login'
import PrivateRoute from './components/common/privetRout'
import NoFoundComponent from './components/common/noFound'
import { EventsList } from './pages/event';
import EventGeneralWarpper from './pages/event/eventGeneral';
import EventTicketsWarpper from './pages/event/eventTickets';
import './App.css'
import { ScanlogsList } from './pages/scanLogs';
import { GetUser } from './features/user/user.api';
import Tickets from './components/form/Tickets'

function App() {
  const {data, isLoading} = useQuery('user',() => GetUser(localStorage.getItem('token')),{
    // disable window focus refetching
      refetchOnWindowFocus: false,
      retry:1
    })
  const auth = data?.data?.username
  console.log("auth login: ",auth)
  if(isLoading) {
    return(
      <>
      loading.....
      </>
    )
  }
  return (
    <>
      <Router>
      <AlertProvider template={AlertTemplate}>
  
      <div>
        <Navbar />
      </div>
      <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <Route path="/test/:qrcode">
            <TicketQrcodeDetailsWarpper />
          </Route> */}
          {/* <PrivateRoute path="/ct" auth={auth}>
            <Tickets />
          </PrivateRoute> */}
          <Route exact path="/tickets/:ticketUuid/details">
            <TicketDetailsWarpper />
          </Route>
          <Route exact path="/tickets/:ticketUuid">
            <TicketGeneralWarpper />
          </Route>
          <PrivateRoute exact path="/tickets">
            <TicketsList />
          </PrivateRoute> 
          <Route exact path="/events/:eventUuid/tickets">
            <EventTicketsWarpper />
          </Route> 
          <Route exact path="/events/:eventUuid">
            <EventGeneralWarpper />
          </Route> 
          <Route exact path="/events">
            <EventsList />
          </Route> 
          <Route exact path="/scanlogs">
            <ScanlogsList />
          </Route>  
          <Route exact path="/scan">
            <Scan />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoFoundComponent />
          </Route>
        </Switch>  
        
      </AlertProvider>
      </Router>
    </>
  );
}

export default App;

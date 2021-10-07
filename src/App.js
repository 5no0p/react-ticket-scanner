import React from 'react'
import {QueryClient, QueryClientProvider} from "react-query";
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
import ScreenShot from './features/test/screenshot';

export const queryClient = new QueryClient() 

function App() {
  // const data = queryClient.getQueryData(['user',localStorage.getItem('token')])
  // const auth = data?.data?.username
  // console.log("auth login: ",auth)
  return (
    <>
      <Router>
      <AlertProvider template={AlertTemplate}>
  
      <QueryClientProvider client={queryClient}> 
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
          {/* <PrivateRoute path="/wb">
            <Websoket />
          </PrivateRoute> */}
          <Route exact path="/tickets/:ticketUuid/details">
            <TicketDetailsWarpper />
          </Route>
          <Route exact path="/tickets/:ticketUuid">
            <TicketGeneralWarpper />
          </Route>
          <Route exact path="/tickets">
            <TicketsList />
          </Route> 
          <Route exact path="/events/:eventUuid/tickets">
            <EventTicketsWarpper />
          </Route> 
          <Route exact path="/events/:eventUuid">
            <EventGeneralWarpper />
          </Route> 
          <PrivateRoute exact path="/events">
            <EventsList />
          </PrivateRoute> 
          <Route exact path="/scanlogs">
            <ScanlogsList />
          </Route> 
          {/* <Route exact path="/screen">
            <ScreenShot />
          </Route>    */}
          <Route exact path="/">
            <Scan />
          </Route>
          <Route path="*">
            <NoFoundComponent />
          </Route>
        </Switch>  
        
      </QueryClientProvider>
      </AlertProvider>
      </Router>
    </>
  );
}

export default App;

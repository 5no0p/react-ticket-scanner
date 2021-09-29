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
import TicketQrcodeDetailsWarpper from './features/test/qrTicketWarper'
import Scan from './components/scan/scan'
import ScanGuardian from './components/scan/scanGardian'
import Navbar from './components/navbar'
import {Login} from './components/login/login'

export const queryClient = new QueryClient() 

function App() {
  return (
    <>
      <Router>
      <AlertProvider template={AlertTemplate}>
  
      <QueryClientProvider client={queryClient}> 
      {/* <div>
      <Navbar />
      </div> */}
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route path="/test/:qrcode">
            <TicketQrcodeDetailsWarpper />
          </Route> */}
          <Route path="/tickets/:ticketUuid/details">
            <TicketDetailsWarpper />
          </Route>
          <Route path="/tickets/:ticketUuid">
            <TicketGeneralWarpper />
          </Route>
          <Route path="/tickets">
            <TicketsList />
          </Route> 
          <Route path="/g">
            <ScanGuardian />
          </Route>  
          <Route path="/">
            <Scan />
          </Route>
        </Switch>  
        
      </QueryClientProvider>
      </AlertProvider>
      </Router>
    </>
  );
}

export default App;

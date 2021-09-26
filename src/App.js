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
import Navbar from './components/navbar'

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Router>
      <AlertProvider template={AlertTemplate}>
  
      <QueryClientProvider client={queryClient}> 
      <div>
      <Navbar />
      </div>
      <Switch>
          {/* <Route path="/test/:qrcode">
            <TicketQrcodeDetailsWarpper />
          </Route> */}
          
          <Route path="/tickets/:ticketUuid">
            <TicketDetailsWarpper />
          </Route>
          <Route path="/tickets">
            <TicketsList />
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

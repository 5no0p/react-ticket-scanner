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
import Scan from './components/scan/scan'

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Router>
      <AlertProvider template={AlertTemplate}>
  
      <QueryClientProvider client={queryClient}> 
      <Switch>
          <Route path="/scan">
            <Scan />
          </Route>
          <Route path="/:ticketUuid">
            <TicketGeneralWarpper />
          </Route>
          <Route path="/">
            <TicketsList />
          </Route>   
        </Switch>  
        
      </QueryClientProvider>
      </AlertProvider>
      </Router>
    </>
  );
}

export default App;

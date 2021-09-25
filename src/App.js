import React from 'react'
import {QueryClient, QueryClientProvider} from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {TicketsList} from './pages/ticket'
import TicketDetailsWarpper from './pages/ticket/ticketDetails'


export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Router>
      <QueryClientProvider client={queryClient}> 
      <Switch>
          <Route path="/:ticketUuid">
            <TicketDetailsWarpper />
          </Route>
          <Route path="/">
            <TicketsList />
          </Route>   
        </Switch>  
        
      </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;

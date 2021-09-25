import React from 'react'
import {QueryClient, QueryClientProvider} from "react-query";
import Dumy from './features/test/dumy'
import DumyDisplay from './features/test/dumyDisplay'

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>   
        <Dumy />
        <DumyDisplay />
      </QueryClientProvider>
    </>
  );
}

export default App;

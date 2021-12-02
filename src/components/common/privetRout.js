import React,{useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {queryClient} from '../../index' //import queryClient
import {useQuery} from "react-query";
import { GetUser } from '../../features/user/user.api';



function PrivateRoute({ children,  ...rest }) {
    const [auth, setauth] = useState(queryClient.getQueryData(['user']))
    //console.log("auth_privet: ",auth)

    return (
      
      <Route
        {...rest}
        render={
          ({ location }) => (
            auth
              ? (
                children
              ) : (
                
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }



export default PrivateRoute;
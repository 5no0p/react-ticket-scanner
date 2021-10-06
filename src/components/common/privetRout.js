import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserQuery } from '../../features/user/user.query';


function PrivateRoute({ children, ...rest }) {
  const [auth, setAuth] = useState(false)
  const token = localStorage.getItem('token')
  const {data,isLoading,isError,error} = UserQuery(token)

  if(data?.status === 200){
    setAuth(true)
  }
  console.log("user data: ",children)
    return (
      <>
      {isLoading
      ?<div>Loading...</div>
      // :isError
      // ?<div>Error: {`${error.respons}`}</div>
      :<Route
        {...rest}
        render={
          ({ location }) => (
            !isError || data
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
      
    }
    </>
    );
  }



export default PrivateRoute;
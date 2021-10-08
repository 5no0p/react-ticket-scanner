import React from 'react'//import react
import { useHistory } from "react-router-dom";//import useHistory
import {useMutation} from 'react-query'  //import useMutation
import { queryClient } from "../../App";
import { LogoutRequest } from "../../features/user/user.api";

const LogOut = () => {
    let history = useHistory();

    const mutation = useMutation(()=>LogoutRequest(),{
        onSuccess: async() => {
          //await queryClient.fetchQuery('user')
          history.push('/login')
          
        }
      })
    
      localStorage.getItem('token')?mutation.mutate():history.push('/login')
      return(
          <>
          {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login">Login</a>
          </li> */}
          </>
      )
}

export default LogOut
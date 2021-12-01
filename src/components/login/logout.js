import React from 'react'//import react
import { useHistory } from "react-router-dom";//import useHistory
import {useMutation} from 'react-query'  //import useMutation
import { queryClient } from "../../App";
import { LogoutRequest } from "../../features/user/user.api";

const LogOut = () => {
    let history = useHistory();

    const mutation = useMutation(LogoutRequest,{
        onSuccess: async() => {
          //await queryClient.fetchQuery('user')
          history.push('/')
          
        }
      })
    mutation.mutate()
      return(
          <></>
      )
}

export default LogOut
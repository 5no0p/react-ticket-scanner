// TODO: impotr dependences

import React, {useState,useEffect} from 'react'//import react
import { useHistory,useParams } from "react-router-dom";//import useHistory
import {useMutation, useQuery} from 'react-query'  //import useMutation
import {GetUser, LoginRequest} from '../../features/user/user.api' //import user feching function
import {queryClient} from '../../index' //import queryClient



export function Login() {
    const [auth, setauth] = useState(queryClient.getQueryData(['user']))
    let history = useHistory();

    const data = queryClient.getQueryData(['user'])
    
    

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const mutation = useMutation(usernfo => LoginRequest(usernfo),
        {
            onSuccess: async ({data}) => {
                localStorage.setItem('token',data.key)
                const res = await queryClient.setQueryData(['user'],() => GetUser(data.key))
                
               if(history.location.state !== undefined) 
               {
                   history.push(`${history.location.state.from.pathname}`)
                }else{
                    history.push('/')
                }
            }
        }
    )
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const usernfo = {
            "username":username,
            "password":password
        }
        mutation.mutate(usernfo)
        
        }
        
       if(auth){
        if(history.location.state !== undefined) 
       {
           history.push(`${history.location.state.from.pathname}`)
        }else{
            history.push('/')
        }
       }
        
            return(
                <>
                <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUser" className="form-label">Username</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputUser"
                        value={username} 
                        onChange={e=>(setUsername(e.target.value))}
                        />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                        />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
                </>
            )
      
    
}
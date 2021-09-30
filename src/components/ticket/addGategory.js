// TODO: impotr dependences

import React, {useState} from 'react'//import react
import { useHistory,useParams } from "react-router-dom";//import useHistory
import {useMutation} from 'react-query'  //import useMutation
import {LoginRequest} from '../../features/user/user.api' //import user feching function
import {queryClient} from '../../App' //import queryClient



export function Login() {
    let history = useHistory();

    const data = queryClient.getQueryData(['user',localStorage.getItem('token')])
    const auth = data?.data?.username
    
    console.log("return path: ",history.location)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const mutation = useMutation(usernfo => LoginRequest(usernfo),
        {
            onSuccess: () => {
                console.log("redirect")
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
        console.log('auth res',mutation)
        
        }
        
        if(localStorage.getItem('token')){
            
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
                        onChange={e=>(setUsername(e.target.value),console.log("username: ",username))}
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
                </>
            )
      
    
}
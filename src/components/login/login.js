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
    const [isLoading, setIsLoading] = useState(false)

    const mutation = useMutation(usernfo => LoginRequest(usernfo),
        {
            onMutate: () => {
                setIsLoading(true)
            },
            onSuccess: () => {
                setIsLoading(false)
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
            if(history.location.state !== undefined) 
               {
                   history.push(`${history.location.state.from.pathname}`)
                }else{
                    history.push('/')
                }
        }
        
            return(
                <>
                <div className="mt-5 container">
                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
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
                            {/* <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div> */}
                            <button type="submit" className="btn btn-primary">Submit <span>{isLoading?<i className="fa fa-spinner fa-pulse ml-2"></i>:null}</span></button>
                        </form>
                    </div>
                </div>
                </>
            )
      
    
}
import {UserQuery} from '../user/user.query'
import {LogoutRequest} from '../user/user.api'
import {queryClient} from '../../index'
import {useMutation} from 'react-query'  //import useMutation
import { useHistory,Redirect } from "react-router-dom";//import useHistory



export default function Auth(){
    let history = useHistory();

    const {data} = UserQuery(localStorage.getItem('token'))

    console.log("user auth test: ",queryClient.getQueryData(['user',localStorage.getItem('token')]))

    const mutation = useMutation(LogoutRequest,{
        onSuccess: () => {
           queryClient.fetchQuery('user')
          console.log('logout')
          history.push('/')
        }
      })
    const clickHandler = () => {
        mutation.mutate()
    }

    return(
        <>
        <div className="mt-5">
        {data?.data?.username?<p>{data.data.username}</p>:<p>No User</p>}
        <button onClick={clickHandler}>Log out</button>
        </div>
        </>
    )
}
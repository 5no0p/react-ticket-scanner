// import dependences
import {useQuery} from 'react-query'  //import useQuery
import {GetUser} from './user.api' //import user feching function
//
// user query
export const UserQuery = (token) => useQuery(['user',token],GetUser(token),{
// disable window focus refetching
  refetchOnWindowFocus: false,
}) 

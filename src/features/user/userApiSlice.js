import { useQuery } from "react-query";

export const fetchUsers = async () => {
    const res = await fetch('https://ticket-scanner.herokuapp.com/api/v1/auth/user/');
    return res.json()
}

export const GetUsers = () => useQuery('users',fetchUsers,  { 
    refetchOnWindowFocus: false ,
    //refetchOnMount: true,

})
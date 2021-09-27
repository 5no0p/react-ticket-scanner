// TODO: import dependences
import {useQuery} from 'react-query'  //import useQuery
import {GetQrcodes,GetQrcodeById} from './qrcode.api' //import tickets feching function
//
// TODO: make qrcodes query
export const GetQrcodesQuery = () => useQuery('qrcodes',GetQrcodes,{
// disable window focus refetching
  refetchOnWindowFocus: false,
}) 
// TODO: make qrcode query
export const GetQrcodesQueryById = (id,token) => useQuery(['qrcode',id,token],()=>GetQrcodeById(id,token),{
  // disable window focus refetching
    refetchOnWindowFocus: false,
  })
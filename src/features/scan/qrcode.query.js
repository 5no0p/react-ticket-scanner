// TODO: import dependences
import {useQuery} from 'react-query'  //import useQuery
import {GetQrcodes,GetQrcodeById, GetScanlogs, GetScanlogsById} from './qrcode.api' //import tickets feching function
import {queryClient} from '../../App'
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
    refetchOnMount:"always",
    retry:1
  })

  export const ScanlogsQuery = (page) => useQuery(['scanlogs',page], ()=> GetScanlogs(page), {
    refetchOnWindowFocus: false,
    keepPreviousData : true 
  })

  export const ScanlogsByIdQuery = (id) => useQuery(['scanlog', id], ()=> GetScanlogsById(id),{
    refetchOnWindowFocus: false,
  })

  

import {queryClient} from '../../App' //import queryClient
import { GetQrcodesQueryById } from '../../features/scan/qrcode.query' //import GetQrcodesQueryById


// function to get data
export function GetQrcodeData(ticketQrcode){
        // get qrcodes query key
          const queryKey = "qrcodes"
    if(queryClient.getQueryData(queryKey) !== undefined){
        //      get the data object from cached query  
          const {data} = queryClient.getQueryData(queryKey)
        //      data was cached
          const isCached = true
          console.log("data from cashe",data)
        //      return object with data and chached status
          return {data,isCached}
        //      make api request to get ticket details
        }else{
        //      no cached data
        const isCached = false
        // get the token
          const token = localStorage.getItem('token')??""
        //       send api with ticket uuiid
          const {data} = GetQrcodesQueryById(ticketQrcode,token)

          console.log("data from api",data)
        //       hold the data object in data holder
          return {data,isCached}
          
        }
}
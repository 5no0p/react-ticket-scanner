
import {queryClient} from '../../App' //import queryClient
import { GetTicketById } from '../../features/ticket/ticket.api'
import { TicketByIdQuery } from '../../features/ticket/ticket.query'


// function to get data
export function GetQrcodeData(ticketQrcode){
        // get qrcodes query key
          const queryKey = "qrcodes"
          //queryClient.invalidateQueries('qrcode')
          
    // if(queryClient.getQueryData(queryKey) !== undefined){
    //     //      get the data object from cached query  
    //       const {data} = queryClient.getQueryData(queryKey)
    //     //      data was cached
    //       const isCached = true
    //       console.log("data from cashe",data)
    //     //      return object with data and chached status
    //       return {data,isCached}
    //     //      make api request to get ticket details
    //     }else{
        //      no cached data
        const isCached = false
        // get the token
          const token = localStorage.getItem('token')??""
        //       send api with ticket uuiid
          const {data,isFetching,isSuccess,isError,isLoading,error,status,isFetched} = TicketByIdQuery(ticketQrcode)
          const getData = data?('status' in data)?data.data:data:data
          

        //       if data holder hold cached data find ticket by uuid
        const ticketData = isCached?getData?.find(d => d.qrcode === ticketQrcode):getData
        //console.log("getData: ",ticketData)
        
        //       hold the data object in data holder
          return {ticketData,isFetched,isSuccess,isError,error,isLoading,status,data}
          
        //}
}
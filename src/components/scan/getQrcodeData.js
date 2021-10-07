
import {queryClient} from '../../App' //import queryClient
import { GetTicketById } from '../../features/ticket/ticket.api'
import { TicketByIdQuery, TicketByQrcodeQuery } from '../../features/ticket/ticket.query'


// function to get data
export function GetQrcodeData(ticketQrcode){
        // get qrcodes query key
          const queryKey = "ticket_qrcode"
          //queryClient.invalidateQueries('qrcode')
          
    if(queryClient.getQueryData(queryKey) !== undefined){
          const token = localStorage.getItem('token')??""
        //      get the data object from cached query  
          const {data,isSuccess,isError,isLoading,error,status} = queryClient.getQueryData([queryKey,ticketQrcode])
        //      data was cached
          const isCached = true
          const ticketData = data
          console.log("data from cashe",data)
        //      return object with data and chached status
          return {ticketData,isSuccess,isError,isLoading,error,status,isCached}
        //      make api request to get ticket details
        }else{
        //     no cached data
        const isCached = false
        // get the token
          const token = localStorage.getItem('token')??""
        //       send api with ticket uuiid
          const {data,isFetching,isSuccess,isError,isLoading,error,status,isFetched} = TicketByQrcodeQuery(ticketQrcode)
          const getData = data?('status' in data)?data.data:data:data
          

        //       if data holder hold cached data find ticket by uuid
        const ticketData = isCached?getData?.find(d => d.qrcode === ticketQrcode):getData
        console.log("data from api: ",ticketData)
        
        //       hold the data object in data holder
          return {ticketData,isFetched,isSuccess,isError,error,isLoading,status,data,isCached}
          
        }
}


import {queryClient} from '../../App' //import queryClient
import { CategoriesEventQuery } from '../../features/category/category.query'
import { TicketByQrcodeQuery } from '../../features/ticket/ticket.query'


// function to get data
export function GetEventTickets(eventUuid){
        // get qrcodes query key
        let isCached = true
          const queryKey = "categories_event"
          if(queryClient.getQueryData([queryKey,eventUuid]) !== undefined){
            //      get the data object from cached query  
                const {isLoading, isError, data, error} = queryClient.getQueryData([queryKey,eventUuid])
            //      hold the data object to data holder
                console.log("data from cashe",data)
                return{isLoading, isError, data, error,isCached}

            //      2. make api request to get ticket details
            }else{
            //      no cached data
              isCached = false
            //       send api with ticket uuiid
              const {isLoading, isError, data, error} = CategoriesEventQuery(eventUuid)
            //       hold the data object in data holder
              console.log("data from api",data)
              return{isLoading, isError, data, error,isCached}
            }
}
// TODO: import dependences for api:
import axios from 'axios'
//
//  TODO: import base api url
import {TicketScanerApiV1BaseUrl} from '../../services/api.urls'

const CategoryApiUrl = `${TicketScanerApiV1BaseUrl}categories`

export const GetCategories = async() => {
    const res = await axios.get(CategoryApiUrl)
    console.log("axios")
    return res
  }

  export const GetCategoryById = async(id) => {
    console.log("id: ",id)
    const res = await axios.get(`${CategoryApiUrl}/${id}`)
    console.log("axios by id")
    return res
  }

  export const GetCategoriesEvent = async(id) => {
    console.log("id: ",id)
    const res = await axios.get(`${CategoryApiUrl}?event__uuid=${id}`)
    console.log("axios by categories event")
    return res
  }

  export const AddCategory = async(info) => {
    console.log("data update ticket: ",info)
    const {data,token} = info
    const res = await axios.post(`${CategoryApiUrl}/`,data,
    {
      headers: {
        'Authorization': `Token ${token}` 
      }
    }
    )
    console.log("axios for update tiket: ",res)
    return res
  }
  
  export const UpdateCategory = async(info) => {
    console.log("data update ticket: ",info)
    const {id,data,token} = info
    const res = await axios.patch(`${CategoryApiUrl}/${id}/`,data,
    {
      headers: {
        'Authorization': `Token ${token}` 
      }
    }
    )
    console.log("axios for update tiket: ",res)
    return res
  }
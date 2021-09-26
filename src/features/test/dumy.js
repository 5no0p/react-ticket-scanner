
//import {Res} from './dumyApi'
//import {GetUsers} from '../user/userApiSlice'
import {GetEvents} from '../event/event.api'

export default function Dumy() {
    // Using a query hook automatically fetches data and returns query values
    //const { data, error, isLoading } = useGetScanlogsQuery()
    const {isLoading, error, data ,isFetching } = GetEvents()
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
    if (isLoading) {
        console.log('loading...')
      } else if (isFetching) {
        console.log("Fetching...")
      } else if (data) {
        console.log("data: ",data)
      } else if (error) {
        console.log("err: ",error)
      }
      return (
          <></>
      )
    //isLoading?console.log('loading...'):data?console.log("data: ",data):error?console.log("err: ",error):null
    // render UI based on data and loading state
  }
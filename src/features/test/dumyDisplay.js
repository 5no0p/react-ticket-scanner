
import uuid from 'react-uuid'
import {Res} from './dummy.query'
import {queryClient} from '../../App'



export default function DumyDisplay() {
    
    //const { data, error, isLoading } = useGetScanlogsQuery()
    const {data} = Res()
    console.log("dataTickets: ",data)
    const kj = data?('status' in data)?data.data:data:data
    

      return (
          <>
            <h1>Forms</h1>           
            {}
            {kj?.map(d=>(
                <div key={uuid()}>
                    {d.uuid}<br/>
                    {d.name}
                </div>
            ))}
          </>
      )
    //isLoading?console.log('loading...'):data?console.log("data: ",data):error?console.log("err: ",error):null
    // render UI based on data and loading state
  }
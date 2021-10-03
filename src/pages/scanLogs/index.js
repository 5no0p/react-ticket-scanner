import React from 'react';//import react
import Spinner from '../../components/common/spinner';//import spinner
import { ScanlogsQuery } from '../../features/scan/qrcode.query';
 
//
export const ScanlogsList = () => {
  //       the data from query are {isLoading, isFetching, data, error}
  const { isLoading, isFetching, isError, data, error } = ScanlogsQuery();
  //       some times {data} is'n the event data so we should be sure we have the events data
  const scanLogsData = data ? ('status' in data ? data.data : data) : data;

  isLoading
    ? console.log('Loading...')
    : //       2.check if is feching, true: console log ("Feching..."), false: go step 3
    isFetching
    ? console.log('Feching...')
    : //       3.check if is data, true: console log ("Data: ",data), false: go step 4
    data
    ? console.log('Data: ', scanLogsData)
    : //       4.check if is error, true: console log ("Error: ",error), false: console.log('nothing!!!')
    error
    ? console.log('Error: ', error)
    : console.log('nothing!!!');
    
  return (
    <>
      
      {isLoading && 
        <>
           <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
             <Spinner />
           </div>
        </>
      }
      {isError &&
        <>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <span>Error: {error.message}</span>
        </div>
     </>
      }
      {scanLogsData && 
            <>
              <div className="container" style={{marginTop:"3.75rem"}}>ScanLogs Page</div>
              <div>
              <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Ticket</th>
                        <th scope="col">Status</th>
                        <th scope="col">Time</th>
                        <th scope="col">Gaurdian</th>
                      </tr>
                    </thead>
                    <tbody>
                {scanLogsData?.map((SlData) => (
                      <tr key={SlData.id} className={SlData.status_recorded==='P'?'table-success':'E'?'table-danger':'I'?'table-warning':'N'?'table-dark':'table-light'}>
                        <td>{SlData.ticket.uuid}</td>
                        <td>{SlData.status_recorded==='P'?'Pass':'E'?'Expired':'I'?'Issue':'N'?'Null':`${SlData.status_recorded}`}</td>
                        <td>{SlData.scan_time}</td>
                        <td>{SlData.scanned_by.username}</td>
                      </tr>      
                ))}
                </tbody>
                </table>
              </div>
            </>
      }

    </>
  );
};
//

import React, { useEffect, useState } from 'react'
import { TicketsViaQrcodeQuery } from '../../features/ticket/ticket.query';

const LocalData = () => {
    const [JsonData, setJsonData] = useState([]); 
    const [files, setFiles] = useState();
    const [mergeFiles, setMergeFiles] = useState();

    const {data,isFetching,isSuccess,isError,isLoading,error,status,isFetched,refetch } = TicketsViaQrcodeQuery()
    const handleClick = () => {
        // manually refetch
        refetch();
      };
      const clickHandler = async () => {
        const fileName = "serverData";
        const json = JSON.stringify(JsonData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const handelFetchFile = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          //console.log("e.target.result", e.target.result);
          setFiles(e.target.result);
        };
        fileReader.onprogress = function(data) {
            if (data.lengthComputable) {                                            
                const progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log(progress);
            }
        }
      };
      const handelMergeFile = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          //console.log("e.target.result", e.target.result);
          setMergeFiles(e.target.result);
        };
        fileReader.onprogress = function(data) {
            if (data.lengthComputable) {                                            
                const progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log(progress);
            }
        }
      };
      const toLocal = (Data) => {
        localStorage.setItem('tickets_file',Data)
        console.log("data localstorage",Data)
      }

      const merge = () => {
        const result =JSON.parse(files).filter(obj => obj.validity === false)
        let localData =JSON.parse(localStorage.getItem('tickets_file'))
        let updateData
        for (let i=0; i < result.length ; ++i){
          localData= localData.map(obj => obj.tid === result[i].tid?{...obj,validity:false}:obj)
        }
        localStorage.setItem('tickets_file',JSON.stringify(localData))
        console.log("file: updated",localData)
      }
    
    useEffect(() => {
        if (isSuccess) {
          setJsonData(data);
        }
      }, [data]);
    
    return(
        <>
        <div className="container  mt-5">
            <div className="row">
                <div className="row my-2">
                    <div className="col" ><button className="btn btn-primary" onClick={handleClick}>Get Data From Server <span>{isLoading?<i className="fa fa-spinner fa-pulse"></i>:null}</span></button></div>   
                </div>
                <div className="col my-2">
                    {isSuccess
                    ?<>
                    <button className="btn btn-primary" onClick={clickHandler}>your file ready for download</button> or {" "}
                    <button className="btn btn-primary" onClick={toLocal(JsonData)}>your file ready for store</button>
                    </>
                    :null}
                </div>
            </div>
            <div className="row">
                <div className="row my-2">
                    <p>Upload file to store it localy:</p>
                    <div className="input-group">
                        <input type="file" className="form-control" onChange={handelFetchFile} aria-label="Upload"/>
                        {files?<button className="btn btn-outline-secondary" type="button" onClick={toLocal(files)}>{JSON.parse(localStorage.getItem('tickets_file'))?"Data Fetched":"Fetch data localy"}</button>:null}
                    </div>  
                </div>
                {JSON.parse(localStorage.getItem('tickets_file'))?<div className="row my-2">
                <p>Upload file to update local data:</p>
                    <div className="input-group">
                        <input type="file" className="form-control" onChange={handelMergeFile} aria-label="Upload"/>
                        {mergeFiles?<button className="btn btn-outline-secondary" type="button" onClick={merge}>Merge local data</button>:null}
                    </div>  
                </div>:null}
            </div>
        </div>
        </>
    )

}

export default LocalData
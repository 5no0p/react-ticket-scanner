import React, { useState } from 'react'
import axios from 'axios'
import { qrcodeApiUrl } from '../ticket/ticket.api';


const DownloadJson = () => {
    const [JsonData, setJsonData] = useState({"hi":"2 hi"}); 
    const [files, setFiles] = useState("");

    const GetJsonFile = () => {
        axios.get(qrcodeApiUrl)
        .then(res => {
            setJsonData(res.data)
            localStorage.setItem('tickets',JSON.stringify(res.data))
            console.log("axios local data: ",res.data)
        })
        .catch(err => {
            console.log("error local data: ",err)

        })
    
    }



  const handleChange = e => {
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

  const fromlocal = () => {
    const qr='Xa95CzcQjA4d0dch9bG3L34VfmKcW'
    const result =JSON.parse(localStorage.getItem('tickets_file')).map(obj => obj.qrcode === qr?{...obj,validity:false}:obj)
    localStorage.setItem('tickets_file',JSON.stringify(result))
    console.log('updated: ',result)
  }

  const merg = () => {
    const result =JSON.parse(files).filter(obj => obj.validity === false)
    let localData =JSON.parse(localStorage.getItem('tickets_file'))
    let updateData
    for (let i=0; i < result.length ; ++i){
      localData= localData.map(obj => obj.tid === result[i].tid?{...obj,validity:false}:obj)
    }
    localStorage.setItem('tickets_file',JSON.stringify(localData))
    console.log("file: updated",localData)
  }

  const toLocal = () => {
    localStorage.setItem('tickets_file',files)
    console.log("data localstorage")
  }
    

    const clickHandler = async () => {
        const fileName = "file";
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
  

  return(<>
    <button onClick={GetJsonFile}>fetch</button>
    <button onClick={clickHandler}>download</button>
    <button onClick={toLocal}>to Local</button>
    <button onClick={fromlocal}>fetch Local</button>
    <button onClick={merg}>merg Local</button>
    <input type="file" onChange={handleChange} />
  
  </>)
}

export default DownloadJson
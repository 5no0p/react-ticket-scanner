import React, { useState } from 'react'
import axios from 'axios'


const ReadJsonFile = () => {
    const GetJsonFile = () => {
        axios.get('data:application/json;base64,eyJoaSI6IjIgaGkifQ==')
        .then(res => {

            console.log("axios local data: ",res.data)
        })
        .catch(err => {
            console.log("error local data: ",err)

        })
        
      }

      return(<>
        <button onClick={GetJsonFile}></button>
      </>)
}

export default ReadJsonFile
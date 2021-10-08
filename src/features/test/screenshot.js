import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import { copyImageToClipboard } from 'copy-image-clipboard'
import ReactWhatsapp from 'react-whatsapp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
export const ScreenShot = () => {
  const [width,setWidth] = useState('100px')
  const [number, setNumber] = useState('249923438849')
  const [message, setMessage] = useState('')
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const notify = () => toast("Image Copied");
  const getImage = async () => {
    
    await takeScreenshot(ref.current)
  
  }
  
  console.log('Image',image===null)

  const URL = 'https://wa.me';
  

  let url = `${URL}/${number}`;

  if (message) {
    url += `?text=${encodeURI(message)}`;
  }

  if(image){
  
    toast("screenshot")
    copyImageToClipboard(image)
        .then(() => {
        console.log('Image Copied')
        notify()
        setNumber(number.replace(/[^\w\s]/gi, '').replace(/ /g, ''));
        window.open(url);
        })
        .catch((e) => {
        console.log('Error: ', e.message)
        })
  }

  const clipboard = () => {
    if(image){

      copyImageToClipboard(image)
        .then(() => {
        console.log('Image Copied')
        notify()
        setNumber(number.replace(/[^\w\s]/gi, '').replace(/ /g, ''));
        window.open(url);
        })
        .catch((e) => {
        console.log('Error: ', e.message)
        })
    }
  }
  

  const onClickHandler = async() => {
    await getImage()
      
   }

// Pass the image src attribute here

  return (
    <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={onClickHandler}>
          Take screenshot
        </button>
        <button style={{ marginBottom: '10px' }} onClick={clipboard}>
          send screenshot
        </button>
      </div>
      <img width={width} src={image} alt={'Screenshot'} />
      <div ref={ref}>
        <h1>5no0p32-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
      </div>
      
      {/* <div className="btn"><ReactWhatsapp number="1-212-736-5000" message="Hello World!!!" element="button className='btn'"/></div> */}
      <ToastContainer />
    </div>
  )
}

export default ScreenShot
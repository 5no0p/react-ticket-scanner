import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import { copyImageToClipboard } from 'copy-image-clipboard'
 
export const ScreenShot = () => {
  const [width,setWidth] = useState('100px')
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = async () => await takeScreenshot(ref.current)
  console.log('Image',image)


  const onClickHandler = () => {
    getImage
    .then(()=>copyImageToClipboard(image)
        .then(() => {
        console.log('Image Copied')
        })
        .catch((e) => {
        console.log('Error: ', e.message)
        }))
    .catch(console.log('errooooooor'))
  }
// Pass the image src attribute here

  return (
    <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={onClickHandler}>
          Take screenshot
        </button>
      </div>
      <img width={width} src={image} alt={'Screenshot'} />
      <div ref={ref}>
        <h1>use-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
      </div>
    </div>
  )
}

export default ScreenShot
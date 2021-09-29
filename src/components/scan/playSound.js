import { useEffect } from "react";
import error_mp3 from '../../assets/sounds/ES_MM_Error.mp3';
import valid_mp3 from '../../assets/sounds/ES_Multimedia.mp3';


export default function Sound({ticketData}) {

    console.log("validity: ",ticketData)
    const validSound= new Audio(valid_mp3) //useSound(valid_mp3)
    const erroreSound= new Audio(error_mp3) //useSound(error_mp3)

    validSound.muted = true
    erroreSound.muted = true

    const playValidSound = () => {
        const playPromise = validSound.play()
      
            if (playPromise !== undefined) {
              playPromise
                .then(_ => {
                  console.log("valid played auto");
                })
                .catch(error => {
                  console.log("valid playback prevented");
                });
            }
      
      }
      const playErrorSound = () => {
        const playPromise = erroreSound.play()
      
            if (playPromise !== undefined) {
              playPromise
                .then(_ => {
                  console.log("error played auto");
                })
                .catch(error => {
                  console.log("error playback prevented");
                });
            }
      
      }
      const playHandler = () => {
        
        ticketData===true?playValidSound():playErrorSound()
      }

      useEffect(()=>{
        playHandler()
      },[])
      return <></>
  //return [playValidSound,playErrorSound];
}
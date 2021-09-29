import React, { Component, Fragment } from 'react';
import error_mp3 from '../../assets/sounds/ES_MM_Error.mp3';
import valid_mp3 from '../../assets/sounds/ES_Multimedia.mp3';

export class Alerts extends Component {
    state = {
     validSound : new Audio(valid_mp3), //useSound(valid_mp3)
     erroreSound : new Audio(error_mp3), //useSound(error_mp3)
     ticketData : this.props.ticketData,
     isScan : this.props.isScan
      }

    playValidSound = () => {
        const playPromise = this.state.validSound.play()
      
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

    playErrorSound = () => {
        const playPromise = this.state.erroreSound.play()
      
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

    componentDidMount() {
    
    console.log("validity: ",this.state.ticketData)

      if (this.state.ticketData===true) this.playValidSound()
      if (this.state.ticketData===false) this.playErrorSound()
  }

  componentDidUpdate(prevProps){
    
        if (this.state.ticketData===true) this.playValidSound()
        if (this.state.ticketData===false) this.playErrorSound()
 

      
  }

  render() {
    return <Fragment />;
  }
}


export default Alerts;

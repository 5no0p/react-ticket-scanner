import React,{ Component } from "react";


class Websoket extends Component {

    state = {
      isLoggedIn: false,
      messages: ['hi'],
      value: 'value',
      name: 'name',
      room: 'vacad',
    }
  
    client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/');
  
    onButtonClicked = (e) => {
      this.client.send(JSON.stringify({
        type: "message",
        message: this.state.value,
        name: this.state.name
      }));
      this.state.value = ''
      e.preventDefault();
    }
  
    componentDidMount() {
      this.client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      this.client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ',message.data);
        if (dataFromServer) {
          this.setState((state) =>
            ({
              messages: [...state.messages,
              {
                msg: dataFromServer.message,
                name: dataFromServer.name,
              }]
            })
          );
        }
      };
    }
  
    render() {
      const { classes } = this.props;
      return (<>
        <bottun onClick={this.onButtonClicked}>hi</bottun>
      </>)}
    }

export default Websoket
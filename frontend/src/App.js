import React, { Component } from 'react';
import './App.css';
import socket from './index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({input: e.target.value})
  }

  handleSubmit(e){
    const that = this;
    e.preventDefault();
    socket.emit('inputMessage', that.state.input);
  }

  componentDidMount() {
    socket.on('reply', function (data) {
      console.log(data);
    })
    socket.emit('blabla', 'Hello World from client');
  }

  componentWillUpdate(){
    const that = this;
    socket.on('listOfMessages', function (data) {
      that.setState({
        messages: data
      })
    })
  }

  render() {
    return (

      <div className="App">
        Guess Vu!
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.input} onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
          </form>
          <div>
            <ul id="messagelist" >

            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

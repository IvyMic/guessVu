import React, { Component } from 'react';
import Form from './form';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="App-title">Guess Vu!</h1>
        <Form setNames={this.props.setNames}/>
      </div>
    );
  }
}

export default Home;
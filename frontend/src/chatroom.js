import React, { Component } from 'react';
import DisplayMessages from './displayMessages';
import GameWon from './gameWon';
import socket from './index.js';
import ShowRealNames from './realNames';
import ShowFakeNames from './fakeNames';
import StartGame from './startGame';
import Guess from './guess';
import axios from 'axios';
import Leave from './leave';
import { throws } from 'assert';
import styles from '../styles/chatroom.css';
import Discovered from './discovered';
import EndGame from './endGame';

import Alert from './alert.js';
import ResultOfGuess from './resultOfGuess';

import { withRouter } from 'react-router-dom';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      guessVisible: true,
      input: '',
      numberOfUsers: 0,
      messages: [],
      fakeNames: [],
      realNames: [],
      guessResult: null,
      winner: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.hideGuessing = this.hideGuessing.bind(this);
    this.setGuessResult = this.setGuessResult.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.errorMsg !== prevProps.errorMsg) {
      console.log('prevProps and current differ')
      this.setState({
        alertVisible: true
      })
    }
  }

  componentDidMount() {
    const that = this;
    // allows user to see updated version of message list
    // when joining room
    socket.emit('retrieveMessages');

    socket.on('newGameForAll', function() {
      that.props.history.push('/');
    })

    socket.on('listOfMessages', function(data) {
      that.setState({
        messages: data
      });
    });

    socket.on('listOfUsers', function(data) {
      that.setState({ realNames: data.allRealNames });
      that.setState({ fakeNames: data.allFakeNames });
      that.setState({ numberOfUsers: data.allFakeNames.length})
    });

    socket.on('winClient', function(data) {
      that.setState({
        winner: {
          fakeName: data.fakeName,
          realName: data.realName
        }
      })
    })
  }



  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    let sentObj = {
      msg: this.state.input
    };

    if (this.props.gameState.open) {
      sentObj.fakeName = "anonymous";
      sentObj.userId = "0"
    } else {
      sentObj.fakeName = this.props.user.fakeName,
      sentObj.userId = this.props.user.id
    }
    socket.emit('inputMessage', sentObj);
    this.setState({
      input: ''
    });
  }

  hideGuessing() {
    console.log("Hide guessing")
    this.setState({
      guessVisible: false
    })
  }

  setGuessResult(result) {
    this.setState({
      guessResult: result
    })
  }

  startGame() {
    socket.emit('startGameServer');
  }

  render() {
    console.log({"state": this.state});
    return (
      <div id="chatRoom">
        <h1 className="ChatRoom-title" id="chatRoomTitle">Welcome {this.props.user.fakeName}</h1>
        <EndGame />
          {this.props.user.discovered && <Discovered />}
          {this.state.winner && <GameWon winner={this.state.winner} />}
        <div className={styles.rightColumn}>
          <div>
            <StartGame startGame={this.startGame} />
            <Leave user={this.props.user} />
          </div>
          {this.state.alertVisible && <Alert msg={this.props.errorMsg} />}
          {!this.props.gameState.open && (
            <div>
              <div>
                {this.state.guessVisible && !this.props.user.discovered &&
                  <div>
                    <Guess guesser={this.props.user} hideGuessing={this.hideGuessing} setGuessResult={this.setGuessResult}/>
                    <div className={styles.guessWarning}>Careful: You can only have {this.props.gameState.maxWrongGuesses} wrong guesses.</div>
                  </div>
                }
                <div className="resultOfGuess">
                  <ResultOfGuess guessResult={this.state.guessResult} />
                </div>
              </div>
              <div className={styles.singleNameDiv}>
                <h3>Fake Names</h3>
                <ShowFakeNames fakeNames={this.state.fakeNames} />
              </div>
              <div className={styles.singleNameDiv}>
                <h3>Real Names</h3>
                <ShowRealNames realNames={this.state.realNames} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.messagesDiv}>
          <div className={styles.displayMsgsDiv} id="messageDisplay">
            <DisplayMessages messages={this.state.messages}/>
          </div>
          <form onSubmit={this.handleSubmit} id="messageInput">
            <input
              name="message"
              className={styles.messageInput}
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Type something..."
            />
            <button className={styles.button} type="submit" id="messageSubmit">
              Submit!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChatRoom);

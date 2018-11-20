import React, { Component } from 'react';
import axios from 'axios';
import ResultOfGuess from './resultOfGuess';
import styles from '../styles/guess.css';

class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessOutcome: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var that = this;
    const guessFakeName = document.getElementById('guessFakeName').value;
    const guessRealName = document.getElementById('guessRealName').value;
    console.log('within guess');

    axios
      .post('/api/user/solve', {
        guesser: this.state.guesser,
        solution: {
          fakeName: guessFakeName,
          realName: guessRealName
        }
      })
      .then(function(response) {
        console.log('within response');
        console.log(response.data);
        if (response.data === true) {
          that.setState({ guessOutcome: 'You guessed correctly!' });
        } else if (response.data === false) {
          that.setState({ guessOutcome: 'Sorry, not this time!' });
        } else {
          console.log('No response');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.guesserDiv} id='guessing'>
        <div className="guessForm" id="guessForm">
          <input
            name="guessFakeName"
            className={styles.guessName}
            id="guessFakeName"
            placeholder="Fake Name"
          />
          <input
            name="guessRealName"
            className={styles.guessName}
            id="guessRealName"
            placeholder="Real Name"
          />
          <button
            className={styles.button}
            type="submit"
            id="guessSubmit"
            onClick={() => this.handleSubmit()}
          >
            Guess!
          </button>
        </div>
        <div className="resultOfGuess">
          <ResultOfGuess guessOutcome={this.state.guessOutcome} />
        </div>
      </div>
    );
  }
}

export default Guess;

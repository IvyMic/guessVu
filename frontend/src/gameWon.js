import React from 'react';
import styles from '../styles/gameWon.css'

const GameWon = (props) => {
  return (
      <h2 class={styles.title} id="gameWon"> {props.winner.realName} aka {props.winner.fakeName} has won!</h2>
  )
}

export default GameWon;

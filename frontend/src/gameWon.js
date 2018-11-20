import React from 'react';

const GameWon = (props) => {
  console.log({"props in GameWon": props});
  return(
    <h2>{props.winner.realName} aka {props.winner.fakeName} has won!</h2>
  )
}

export default GameWon;

import React from 'react';

const Alert = (props) => {
  console.log({"props of Alert": props});
  return(
    <div className="signupError" id="signupError">{props.msg}</div>
  )
}

export default Alert;

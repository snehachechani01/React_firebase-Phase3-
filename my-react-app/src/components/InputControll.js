import React from 'react'
// import '../../css/InputConroller.css'

function InputControll(props) {
  return (
      <div className={'input-container'}>
        {props.label && <label>{props.label}</label>}
        <input type="text" {...props} />
      </div>
  );
}

export default InputControll
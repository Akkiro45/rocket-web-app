import React from 'react';

import module from './Input.module.css';

const input = (props) => {
  return (
    <input 
      className={props.borderedInput ? module.borderedInput : module.input }
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      autoFocus={props.autoFocus}
    />
  );
}

export default input;
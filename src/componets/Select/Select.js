import React from 'react';

import module from './Select.module.css';

const select = (props) => {
  let options = null;
  if(props.options) {
    options = props.options.map((option, i) => {
      return <option key={i + option} value={option} >{option}</option>
    }); 
  }
  return (
    <select className={module.Select} value={props.value} name={props.name} onChange={props.onChange} >
      {options}
    </select>
  );
}

export default select;
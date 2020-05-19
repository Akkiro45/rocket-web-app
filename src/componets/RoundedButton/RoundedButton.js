import React from 'react';

import module from './RoundedButton.module.css'

const roundedButton = (props) => {
  return (
    <div onClick={props.onClick} className={module.root} >
      {props.title}
    </div>
  );
}

export default roundedButton;
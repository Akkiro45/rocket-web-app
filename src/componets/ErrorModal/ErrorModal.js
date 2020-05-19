import React from 'react';

import module from './ErrorModal.module.css';
import Modal from '../Modal/Modal';
import { ALERT } from '../../util/icons';

const errorModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      onClick={props.onClick}
    >
      <div className={module.root} >
        <ALERT className={module.icon} />
        <div className={module.text} >
          {props.error}
        </div>
      </div>  
    </Modal>
  );
}

export default errorModal;
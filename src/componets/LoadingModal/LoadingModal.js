import React from 'react';
import RingLoader from "react-spinners/RingLoader";

import module from './LoadingModal.module.css';
import Modal from '../Modal/Modal';

const loadingModal = (props) => {
  return (
    <Modal
      visible={props.visible}
    >
      <div className={module.root} >
        <div className={module.text} >
          {props.message ? props.message : 'Loading...'}
        </div>
        <div className={module.spinner} >
          <RingLoader
            size={60}
            color={"#ff8a65"}
            loading={true}
          />
        </div>
      </div>  
    </Modal>
  );
}

export default loadingModal;
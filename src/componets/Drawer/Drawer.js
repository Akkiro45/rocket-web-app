import React from 'react';

import module from './Drawer.module.css';
import Aux from '../Auxx/Auxx';
import { SIGNOUT, TOGGLE_OFF, TOGGLE_ON } from '../../util/icons';
import { emailID, webLink } from '../../util/util';

const drawer = (props) => {
  let attachedClassses = [module.drawer, module.Close];
  if (props.show) {
    attachedClassses = [module.drawer, module.Open];
  }
  return (
  <Aux>
    {props.show ? <div className={module.backdrop} onClick={props.onClick} /> : null}
    <div className={attachedClassses.join(' ')}  >
      <div className={module.container} >
        <div className={module.title} >Settings</div>
        <div className={module.divider} ></div>
        <div className={module.item1} >
          Dark mode
          {props.mode !== 'LIGHT' ? <TOGGLE_ON className={module.icon} onClick={props.toggleTheme} /> : <TOGGLE_OFF className={module.icon} onClick={props.toggleTheme} />}
        </div>
        <div className={module.divider} ></div>
        <div className={module.item2} onClick={props.onSignoutClick} >
          <SIGNOUT className={module.icon} />
          Signout
        </div>
      </div>
      <div className={module.footer} >
        <div style={{ fontSize: '14px', paddingBottom: '5px' }} >
          {emailID}
        </div>
        <div style={{ color: '#ff7043', fontSize: '14px' }} >
          {webLink}
        </div>
      </div>
    </div>
  </Aux>
  );
}

export default drawer;
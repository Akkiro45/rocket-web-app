import React, { Component } from 'react';

import module from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.visible !== this.props.visible || nextProps.children !== this.props.children;
  }
  render() {
    if(this.props.visible) {
      return (
        <div className={module.root} onClick={this.props.onClick}  >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={module.modal} 
            style={{
              transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.visible ? '1' : '0',
              width: this.props.width,
              height: this.props.height,
              maxWidth: this.props.maxWidth
            }}
          >
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Modal;
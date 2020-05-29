import React, { Component } from 'react';
import { connect } from 'react-redux';
import SyncLoader from "react-spinners/SyncLoader";

import module from './PwdCheckModal.module.css';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { resetError, checkPassword } from '../../store/actions/index';

class PwdCheckModal extends Component {
  state = {
    password: ''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if(this.props.error) {
      this.props.onResetError();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.hide === false && this.state.password !== '') {
      this.props.onClick(true);
      this.setState({ password: '' });
    }
  }
  onKeyPressed = (e) => {
    if(e.key === 'Enter') {
      this.props.onCheckPasssword(this.state.password, this.props.token);
    }
  }
  render() {
    let input = (
      <Input 
        placeholder='Password'
        name='password'
        type='password'
        value={this.state.password}
        onChange={(e) => this.onChange(e)}
        borderedInput
        maxLength={60}
        minLength={8}
        autoFocus
      />
    );
    if(this.props.loading) {
      input = (
        <SyncLoader
          size={10}
          color={"#ff8a65"}
          loading={true}
        />
      );
    }
    let error = null;
    if(this.props.error) {
      error = (
        <div className={module.error} >
          {this.props.error}
        </div>
      );
    }
    return (
      <Modal 
        visible={this.props.visible} 
        onClick={this.props.onClick} 
        width='280px'
      >
        <div onKeyPress={this.onKeyPressed} >
          <div className={module.title} >Enter Password</div>
          <div className={module.input} >
            {input}
          </div>
          {error}
          <div className={module.controls} >
            <div className={module.button} onClick={this.props.onClick} >Cancel</div>
            <div className={module.button} style={{ color: '#ff7043', borderRight: 0 }} onClick={() => 
            this.props.onCheckPasssword(this.state.password, this.props.token)} >Show</div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    hide: state.link.hide,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckPasssword: (password, token) => dispatch(checkPassword(password, token)),
    onResetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PwdCheckModal);
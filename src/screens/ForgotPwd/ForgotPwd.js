import React, { Component } from 'react';
import { connect } from 'react-redux';
import RingLoader from "react-spinners/RingLoader";

import module from './ForgotPwd.module.css';
import { validateEmail } from '../../util/util';
import { resetError, getResetPwdToken, setDone } from '../../store/actions/index';
import { ROCKET, ALERT, CHECK } from '../../util/icons';
import Input from '../../componets/Input/Input';

class ForgotPwd extends Component {
  state = {
    error: null,
    emailId: '',
  }
  componentDidMount() {
    this.props.onSetDone(false);
    this.props.onResetError(); 
  }
  componentWillUnmount() {
    this.props.onSetDone(false);
    this.props.onResetError();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }
  onClick = () => {
    if(!validateEmail(this.state.emailId)) {
      this.setState({ error: 'Please enter valid email ID!' });
    } else {
      // Submit
      this.props.onGetResetPwdToken({
        emailId: this.state.emailId
      });
    }
  } 
  onKeyPressed = (e) => {
    if(e.key === 'Enter') {
      this.onClick();
    }
  }
  render() {
    let ren = null;
    if(this.props.loading) {
      ren = (
        <div className={module.loer} >
          <RingLoader
            size={70}
            color={"#ff8a65"}
            loading={true}
          />
        </div>
      );
    } else if(this.props.error) {
      ren = (
        <div className={module.loer} >
          <ALERT style={{ marginBottom: '10px', fontSize: '35px' }} />
          {this.props.error}
        </div>
      );
    } else if(this.props.done) {
      ren = (
        <div className={module.loer} style={{ color: '#000' }} >
          <CHECK style={{ marginBottom: '10px', fontSize: '40px', color: '#00d348' }} />
          Reset password link is sent to {this.state.emailId}!
        </div>
      );
    } else {
      ren = (
        <div className={module.inputContainer} onKeyPress={this.onKeyPressed} >
          <div className={module.title} >Reset Password</div>
          <div className={module.input} >
            <Input 
              placeholder='Enter registered email ID'
              type='email'
              name='emailId'
              value={this.state.emailId}
              onChange={this.onChange}
              minLength={2} />
          </div>
          <div className={module.button} onClick={this.onClick} >
            Submit
          </div>
          <div className={module.error} >{this.state.error}</div>
        </div>
      );
    }
    return (
      <div className={module.root} >
        <div className={module.header} >
          Forgot Password
        </div>
        <div className={module.brand} >
          Rocket
          <ROCKET />
        </div>
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    done: state.auth.done
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetError: () => dispatch(resetError()),
    onGetResetPwdToken: (data) => dispatch(getResetPwdToken(data)),
    onSetDone: (done) => dispatch(setDone(done))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwd);
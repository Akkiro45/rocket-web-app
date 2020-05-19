import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RingLoader from "react-spinners/RingLoader";

import module from './ResetPwd.module.css';
import { resetError, setDone, validateResetPwdToken, resetPwd } from '../../store/actions/index';
import { ROCKET, ALERT, CHECK } from '../../util/icons';
import Input from '../../componets/Input/Input';

class ResetPwd extends Component {
  state = {
    error: null,
    password: '',
    rePassword: ''
  }
  componentDidMount() {
    this.props.onSetDone(false);
    this.props.onResetError();
    const token = this.props.location.search.split('=')[1];
    this.props.onValidateResetPwdToken(token);
  }
  componentWillUnmount() {
    this.props.onResetError();
    this.props.onSetDone(false);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }
  onClick = () => {
    if((this.state.password.length < 8 || this.state.password.length > 60) || (this.state.rePassword.length < 8 || this.state.rePassword.length > 60)) {
      this.setState({ error: 'Please enter password between 8 to 60 characters!' });
    } else if(this.state.password !== this.state.rePassword) {
      this.setState({ error: 'Please enter same password in both filed!' });
    } else {
      // Submit
      this.props.onResetPwd({
        token: this.props.location.search.split('=')[1],
        password: this.state.password
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
          Password successfully reseted!
          <div className={module.link} onClick={() => {
            this.props.history.replace('/');
          }} >Signin</div>
        </div>
      );
    } else {
      ren = (
        <div className={module.inputContainer} onKeyPress={this.onKeyPressed} >
          <div className={module.title} >Set Password</div>
          <div className={module.input} >
            <Input 
              placeholder='Enter password'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              maxLength={60}
              minLength={8} />
          </div>
          <div className={module.input} >
            <Input placeholder='Re-enter password'
              type='password'
              name='rePassword'
              value={this.state.rePassword}
              onChange={this.onChange}
              maxLength={60}
              minLength={8} />
          </div>
          <div className={module.button} onClick={this.onClick} >
            Reset
          </div>
          <div className={module.error} >{this.state.error}</div>
        </div>
      );
    }
    return (
      <div className={module.root} >
        <div className={module.header} >
          Reset Password
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
    onSetDone: (done) => dispatch(setDone(done)),
    onValidateResetPwdToken: (token) => dispatch(validateResetPwdToken(token)),
    onResetPwd: (data) => dispatch(resetPwd(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPwd));
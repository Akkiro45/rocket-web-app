import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import module from './Signin.module.css';
import { ROCKET } from '../../util/icons';
import { tagLine } from '../../util/util';
import { validateAuth } from '../../util/validation';
import { auth, resetError } from '../../store/actions/index';
import Header from '../../componets/Header/Header';
import RoundedButton from '../../componets/RoundedButton/RoundedButton';
import Input from '../../componets/Input/Input';
import ErrorModal from '../../componets/ErrorModal/ErrorModal';
import LoadingModal from '../../componets/LoadingModal/LoadingModal';

class Signin extends Component {
  state = {
    userName: '',
    password: '',
    error: null
  }
  onClick = () => {
    this.setState(prevState => {
      return { show: !prevState.show }
    });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: validateAuth(e.target.name, e.target.value).error });
  }
  onSigninPress = () => {
    this.doAuth();
  }
  onSignupPress = () => {
    this.props.history.replace('/signup');
  }
  onKeyPressed = (e) => {
    if(e.key === 'Enter') {
      this.doAuth();
    }
  }
  doAuth = () => {
    const userNameError = validateAuth('userName', this.state.userName);
    const passwordError = validateAuth('password', this.state.password);
    if(userNameError.error) {
      this.setState({ error: userNameError.error });
    } else if(passwordError.error) {
      this.setState({ error: passwordError.error });
    } else {
      const data = {
        userName: this.state.userName,
        password: this.state.password
      }
      this.props.onAuth(data, true, this.props.history);
    }
  }
  render() {
    return (
      <div className={module.root} onKeyPress={this.onKeyPressed} >
        <ErrorModal visible={this.props.error ? true : false} onClick={this.props.onResetError} error={this.props.error} />
        <LoadingModal visible={this.props.loading} message={'Signing you in...'} />
        <Header toggleTheme={this.props.toggleTheme} hide mode={this.props.mode} />
        <div className={module.container} >
          <ROCKET className={module.icon} />
          <div>{tagLine}</div>
          <div className={module.form} >
            <div className={module.h1} >Welcome Back!</div>
            <div className={module.input} >
              <Input 
                value={this.state.userName}
                onChange={(e) => this.onChange(e)}
                placeholder='Username'
                name='userName'
                minLength={2}
                maxLength={20}
                required
              />
            </div>
            <div className={module.input} >
              <Input 
                value={this.state.password}
                onChange={(e) => this.onChange(e)}
                placeholder='Password'
                name='password'
                minLength={8}
                maxLength={60}
                required
                type='password'
              />
            </div>
            <div className={module.error} >{this.state.error}</div>
            <div className={module.button} >
              <RoundedButton title='SIGN IN' onClick={this.onSigninPress} />
            </div>
            <div className={module.h3} onClick={() => this.props.history.push('/forgot/password')} 
              style={{ marginBottom: '8px' }} >Forgot password?</div>
            <div className={module.h2} >Don't have an account?</div>
            <div className={module.h3} onClick={this.onSignupPress} >Sign up</div>
          </div>
        </div>
      </div>  
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    loading: state.loading.loading,
    error: state.error.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (data, isSignin, history) => dispatch(auth(data, isSignin, history)),
    onResetError: () => dispatch(resetError())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
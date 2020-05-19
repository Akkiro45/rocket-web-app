import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import module from './Signup.module.css';
import { ROCKET } from '../../util/icons';
import { tagLine } from '../../util/util';
import { validateAuth } from '../../util/validation';
import { auth, resetError } from '../../store/actions/index';
import Header from '../../componets/Header/Header';
import RoundedButton from '../../componets/RoundedButton/RoundedButton';
import Input from '../../componets/Input/Input';
import ErrorModal from '../../componets/ErrorModal/ErrorModal';
import LoadingModal from '../../componets/LoadingModal/LoadingModal';

class Signup extends Component {
  state = {
    userName: '',
    emailId: '',
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
  onSignupPress = () => {
    this.doAuth();
  }
  onSigninPress = () => {
    this.props.history.replace('/signin');
  }
  onKeyPressed = (e) => {
    if(e.key === 'Enter') {
      this.doAuth();
    }
  }
  doAuth = () => {
    const userNameError = validateAuth('userName', this.state.userName);
    const passwordError = validateAuth('password', this.state.password);
    const emailIdError = validateAuth('emailId', this.state.emailId);
    if(userNameError.error) {
      this.setState({ error: userNameError.error });
    } else if(emailIdError.error) {
      this.setState({ error: emailIdError.error });
    } else if(passwordError.error) {
      this.setState({ error: passwordError.error });
    } else {
      const data = {
        userName: this.state.userName,
        emailId: this.state.emailId,
        password: this.state.password
      }
      this.props.onAuth(data, false, this.props.history);
    }
  }
  render() {
    return (
      <div className={module.root} onKeyPress={this.onKeyPressed} >
        <ErrorModal visible={this.props.error ? true : false} onClick={this.props.onResetError} error={this.props.error} />
        <LoadingModal visible={this.props.loading} message={'Signing you up...'} />
        <Header toggleTheme={this.props.toggleTheme} mode={this.props.mode} hide />
        <div className={module.container} >
          <ROCKET className={module.icon} />
          <div>{tagLine}</div>
          <div className={module.form} >
            <div className={module.h1} >Welcome!</div>
            <div className={module.input} >
              <Input 
                value={this.state.emailId}
                onChange={(e) => this.onChange(e)}
                placeholder='Email ID'
                name='emailId'
                minLength={2}
                required
                type='email'
              />
            </div>
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
              <RoundedButton title='SIGN UP' onClick={this.onSignupPress} />
            </div>
            <div className={module.h2} >Already have an account?</div>
            <div className={module.h3} onClick={this.onSigninPress} >Sign in</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
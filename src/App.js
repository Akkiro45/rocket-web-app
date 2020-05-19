import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { autoSignin, setLinks } from './store/actions/index';
import Signin from './screens/Signin/Signin';
import Signup from './screens/Signup/Signup';
import Signout from './screens/Signout/Signout';
import Home from './screens/Home/Home';
import ResetPwd from './screens/ResetPwd/ResetPwd';
import ForgotPwd from './screens/ForgotPwd/ForgotPwd';

class App extends Component {
  state = {
    theme: 'LIGHT'
  }
  componentDidMount() {
    const theme = localStorage.getItem('theme');
    if(theme === 'DARK') {
      this.changeTheme();
    }
    let links = localStorage.getItem('links');
    links = JSON.parse(links); 
    if(!links) links = [];
    this.props.onSetLinks(links);
    this.props.onAutoSignin();
  }
  changeTheme = () => {
    this.setState(prevState => {
      let theme = prevState.theme;
      if(theme === 'LIGHT') theme = 'DARK';
      else theme = 'LIGHT';
      document.documentElement.classList.add('theme-transition')
      document.documentElement.setAttribute('data-theme', theme)
      window.setTimeout(function() {
        document.documentElement.classList.remove('theme-transition')
      }, 1000);
      localStorage.setItem('theme', theme);
      return { theme };
    });
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/forgot/password" component={() => <ForgotPwd />} />
        <Route path="/reset/password" component={() => <ResetPwd />} />
        <Route path="/signin" component={() => <Signin toggleTheme={this.changeTheme} mode={this.state.theme} />} />
        <Route path="/signup" component={() => <Signup toggleTheme={this.changeTheme} mode={this.state.theme} />} />
        <Redirect to="/signin" />
      </Switch>
    );
    if(this.props.token) {
      routes = (
        <Switch>
          <Route path="/signout" exact component={() => <Signout toggleTheme={this.changeTheme} mode={this.state.theme} />} />
          <Route path="/" exact component={() => <Home toggleTheme={this.changeTheme} mode={this.state.theme} />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return routes;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: () => dispatch(autoSignin()),
    onSetLinks: (links) => dispatch(setLinks(links))
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

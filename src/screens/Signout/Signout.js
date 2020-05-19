import React, { Component } from 'react';
import { connect } from 'react-redux';
import RingLoader from "react-spinners/RingLoader";

import module from './Signout.module.css';
import { onSignout } from '../../store/actions/index';

import Header from '../../componets/Header/Header';

class Signout extends Component { 
  componentDidMount() {
    this.props.onSignout();
  }
  render() {
    return (
      <div className={module.root} >
        <Header toggleTheme={this.props.toggleTheme} hide mode={this.props.mode} />
        <div className={module.container} >
          <div className={module.text} >Signing you out...</div>
          <RingLoader
            size={80}
            color={"#ff8a65"}
            loading={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignout: (token) => dispatch(onSignout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RingLoader from "react-spinners/RingLoader";

import module from './AddLinkModal.module.css';
import { ROCKET, ALERT } from '../../util/icons';
import { isEmty } from '../../util/util';
import { resetError, onAddLink } from '../../store/actions/index';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Select from '../Select/Select';

class AddLinkModal extends Component {
  state = {
    url: '',
    currGroup: 'None',
    group: '',
    error: null
  }
  componentDidMount() {
    navigator.clipboard.readText()
      .then(text => {
        console.log(text)
        this.setState({ url: text });
      })
      .catch(() => {});
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }
  onReset = () => {
    this.setState({ url: '', currGroup: 'None', group: '', error: null });
  }
  onPressAdd = () => {
    if(isEmty(this.state.url)) {
      this.setState({ error: 'Please enter link!' });
    } else if(this.state.currGroup === 'Add New' && isEmty(this.state.group)) {
      this.setState({ error: 'Plasea enter group name!' });
    } else {
      const data = {
        url: this.state.url,
        group: this.state.currGroup === 'Add New' ? this.state.group : this.state.currGroup
      }
      this.props.onAddLink(this.props.token, data, () => {
        this.onReset();
        this.props.onShowAddLinkModal();
      });
    }
  }
  onKeyPressed = (e) => {
    if(e.key === 'Enter') {
      this.onPressAdd();
    }
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('Add New');
    let grp = (
      <div className={module.item} >
        <div className={module.tag} >Tag : </div>
          <div style={{ height: '100%', width: '75%' }} >
            <Select 
              name='currGroup'
              value={this.state.currGroup}
              options={groups}
              onChange={(e) => this.onChange(e)}
            />
          </div>
      </div>
    );
    if(this.state.currGroup === 'Add New') {
      grp = (
        <div className={module.item} >
          <Input 
            placeholder='Tag name'
            name='group'
            value={this.state.group}
            onChange={(e) => this.onChange(e)}
            borderedInput
            maxLength={30}
          />
        </div>
      );
    }
    let body = (
      <div style={{ width: '100%', height: '70%' }} >
        <div className={module.body} >
          <div className={module.item} >
            <Input 
              placeholder='Paste link here'
              name='url'
              type='url'
              value={this.state.url}
              onChange={(e) => this.onChange(e)}
              borderedInput
              autoFocus
            />
          </div>
          {grp}
          <div className={module.reset} onClick={this.onReset} >Reset</div>
        </div>
        <div className={module.footer} >
          <div className={module.error} > 
            {this.state.error}
          </div>
          <div className={module.button} onClick={this.onPressAdd} >
            Add
          </div>
        </div>
      </div>
    );
    if(this.props.loading) {
      body = (
        <div className={module.loading} >
          <RingLoader
            size={60}
            color={"#ff8a65"}
            loading={true}
          />
        </div>
      );
    } else if(this.props.error) {
      body = (
        <div className={module.loading} >
          <ALERT className={module.alertIcon} />
          <div className={module.error} >{this.props.error}</div>
          <div className={module.button} onClick={this.props.onResetError} >
            Retry
          </div>
        </div>
      );
    }
    return (
      <Modal 
        visible={this.props.visible} 
        onClick={this.props.onShowAddLinkModal} 
        width='80%' 
        height='80%' 
        maxWidth='600px'
      >
        <div className={module.root} onKeyPress={this.onKeyPressed} >
          <div className={module.header} >
            <div className={module.title} >Add Link</div>
            <ROCKET className={module.icon} />
          </div>
          {body}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.link.groups,
    loading: state.loading.loading,
    error: state.error.error,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetError: () => dispatch(resetError()),
    onAddLink: (token, data, done) => dispatch(onAddLink(token, data, done))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkModal);
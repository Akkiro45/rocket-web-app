import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer } from 'react-toastify';

import module from './Home.module.css';
import { fetchLinks, resetError } from '../../store/actions/index';

import { User, ADD, SORT_ASC, SORT_DESC, ROCKET } from '../../util/icons';
import filter from '../../util/filter';
import Header from '../../componets/Header/Header';
import MobileHeader from '../../componets/MobileHeader/MobileHeader';
import Drawer from '../../componets/Drawer/Drawer';
import Input from '../../componets/Input/Input';
import Select from '../../componets/Select/Select';
import Link from '../../componets/Link/Link';
import AddLinkModal from '../../componets/AddLinkModal/AddLinkModal';

class Home extends Component {
  state = {
    order: false,
    search: '',
    currGroup: 'All',
    drawer: false,
    showAddLinkModal: false
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.props.onFetchLinks(this.props.token);
  }
  onRefresh = () => {
    this.props.onResetError();
    this.props.onFetchLinks(this.props.token);
  }
  onSortClick = () => {
    this.setState(prevState => {
      return { order: !prevState.order }
    });
  }
  onDrawerClick = () => {
    this.setState(prevState => {
      return { drawer: !prevState.drawer };
    });
  }
  onShowAddLinkModal = () => {
    this.setState(prevState => {
      return { showAddLinkModal: !prevState.showAddLinkModal };
    });
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('All');
    let loading = null;
    if(this.props.loading) {
      loading = (
        <div className={module.fetchLoading} >
          <div style={{ margin: '20px' }} >
            <SyncLoader
              size={15}
              color={"#ff8a65"}
              loading={true}
            />
          </div>
          Fething links...
        </div>
      );
    } else {
      loading = (
        <div className={module.fetchLoading} >
          <div className={module.refreshButton} onClick={this.onRefresh} >Refresh</div>
        </div>
      );
    }
    let items = null;
    if(this.props.links.length === 0  && !this.props.loading) {
      items = (
        <div className={module.emty} >
          <ROCKET style={{ fontSize: '50px' }} />
          Emty!
        </div>
      );
    } else {
      items = (
        <div className={module.items} >
          {filter(this.props.links, this.state.currGroup, this.state.search, this.state.order).map((link, i) => {
            return (
              <Link  
                link={link}
                key={link._id + i}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className={module.root} >
        <ToastContainer />
        <AddLinkModal visible={this.state.showAddLinkModal} onShowAddLinkModal={this.onShowAddLinkModal} />
        <Header toggleTheme={this.props.toggleTheme} mode={this.props.mode} />
        <MobileHeader 
          username={this.props.data.userName} 
          order={this.state.order}
          onSortClick={this.onSortClick}
          onDrawerClick={this.onDrawerClick}
        />
        <Drawer 
          show={this.state.drawer} 
          onClick={this.onDrawerClick} 
          toggleTheme={this.props.toggleTheme} 
          mode={this.props.mode}
          onSignoutClick={() => this.props.history.replace('/signout')}
        />
        <div className={module.filters} >
          <div className={module.filterItem1}>
            <Input 
              placeholder='Search...'
              name='search'
              type='serach'
              value={this.state.search}
              onChange={(e) => this.onChange(e)}
              borderedInput
            />
          </div>
          <div className={module.filterItem1} >
            <Select 
              name='currGroup'
              value={this.state.currGroup}
              options={groups}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div className={module.filterItem2} onClick={this.onSortClick} >
            {this.state.order ? <SORT_DESC /> : <SORT_ASC />}
          </div>
          <div className={module.filterItem2} onClick={this.onShowAddLinkModal} >
            <ADD />
          </div>
          <div className={module.filterItem3} >
            <User className={module.userIcon} />
            <div className={module.username} >
              {this.props.data.userName}
            </div>
          </div>
        </div>
        <div className={module.mobileFilters} >
          <ADD className={module.addButton} onClick={this.onShowAddLinkModal} />
          <div className={module.mobileFilterItem} >
            <Select 
              name='currGroup'
              value={this.state.currGroup}
              options={groups}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div className={module.mobileFilterItem} >
            <Input 
              placeholder='Search...'
              name='search'
              type='serach'
              value={this.state.search}
              onChange={(e) => this.onChange(e)}
              borderedInput
            />
          </div>
        </div>
        {loading}
        {items}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    data: state.auth.data,
    loading: state.loading.loading,
    error: state.error.error,
    groups: state.link.groups,
    links: state.link.links
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchLinks: (token) => dispatch(fetchLinks(token)),
    onResetError: () => dispatch(resetError())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
import React, { Component } from 'react';
import { ToggleLayer, Arrow,  } from 'react-laag';
import { connect } from 'react-redux';
import RingLoader from "react-spinners/RingLoader";

import module from './Link.module.css';
import { MORE_VERTICAL, ROCKET } from '../../util/icons';
import { onRemoveLink, editLink } from '../../store/actions/index';
import Menu from '../Menu/Menu';

class Link extends Component {
  state = {
    image: null
  }
  _onError = () => {
    this.setState({ image: null });
  }
  componentDidMount() {
    this.setState({ image: this.props.link.image });
  }
  render() {
    let title = null;
    let description = null;
    let url = null;
    if(this.props.link.title) {
      title = (
        <div className={module.title} >
          {this.props.link.title}
        </div>
      );
    }
    if(this.props.link.description) {
      description = (
        <div className={module.description} >
          {this.props.link.description}
        </div>
      );
    }
    if(this.props.link.url) {
      url = (
        <div className={module.url} > 
          {this.props.link.logo ? (
            <div className={module.logo} >
              <img alt='' src={this.props.link.logo} className={module.img} style={{ borderRadius: 0 }} />
            </div>
          ) : null}
          <div className={this.props.link.logo ? module.urlText1 :  module.urlText} >
            {this.props.link.url}
          </div>
          <ToggleLayer
            renderLayer={({ isOpen, layerProps, arrowStyle, layerSide, close }) =>
              isOpen && (
                <div
                  ref={layerProps.ref}
                  className={module.layer}
                  style={{
                    ...layerProps.style
                  }}
                >
                  <Menu 
                    link={this.props.link} 
                    close={close} 
                    onRemoveLink={() => this.props.onRemoveLink(this.props.token, this.props.link._id, this.props.links)}
                    onEditLink={(op) => this.props.onEditLink(this.props.token, this.props.link._id, 'hide', op, this.props.links)}
                    hide={this.props.hide}
                  />
                  <Arrow
                    style={arrowStyle}
                    layerSide={layerSide}
                    backgroundColor="#fff"
                    borderWidth={1}
                    borderColor="#ccc"
                    roundness={0.5}
                  />
                </div>
              )
            }
            placement={{
              autoAdjust: true,
              triggerOffset: 10
            }}
          >
            {({ triggerRef, toggle }) => (
              <div ref={triggerRef} onClick={toggle}>
                <MORE_VERTICAL className={module.moreVertical} />
              </div>
            )}
          </ToggleLayer>
        </div>
      );
    }
    const emtyImage = (
      <div className={module.emtyImage} >
        <ROCKET style={{ color: '#ff8a65', fontSize: '45px' }} />
      </div>
    );
    let loading = (
      <div className={module.loading} >
        <RingLoader
          size={50}
          color={"#ff8a65"}
          loading={true}
        />
      </div>
    );
    let ren = null;
    if(this.props.link.description && !this.state.image) {
      ren = description;
    } else if(!this.props.link.description && this.state.image) {
      ren = (
        <div style={{ height: '150px', width: '100%' }} >
          <img alt='Rocket' onError={this._onError} src={this.state.image} className={module.img} />
        </div>
      );
    } else if(this.props.link.description && this.state.image) {
      ren = (
        <div style={{ height: '150px', width: '100%', display: 'flex' }} >
          <div className={module.imageContainer} >
            <img alt='Rocket' onError={this._onError} src={this.state.image} className={module.img} />
          </div>
          <div className={module.descriptionContainer} >
            {this.props.link.description}
          </div>
        </div>
      );
    }
    let deskImg = null;
    if(this.state.image) {
      deskImg = (
        <img alt='Rocket' src={this.state.image} className={module.img} />
      );
    } else {
      deskImg = emtyImage;
    }
    if(this.props.loading === true && this.props.curr === this.props.link._id) {
      ren = loading;
      deskImg = loading;
    }
    return (
      <div className={module.root} >
        <div className={module.container} >
          <div className={module.image} >
            {deskImg}
          </div>
          {title}
          {description}
          {url}
        </div>
        <div className={module.mobileContainer} >
          {url}
          {title}
          {ren}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    curr: state.link.curr,
    token: state.auth.token,
    links: state.link.links,
    hide: state.link.hide
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveLink: (token, id, links) => dispatch(onRemoveLink(token, id, links)),
    onEditLink: (token, id, type, value, links) => dispatch(editLink(token, id, type, value, links))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);
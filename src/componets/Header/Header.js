import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import module from './Header.module.css';
import { ROCKET, TOGGLE_OFF, TOGGLE_ON, SIGNOUT } from '../../util/icons';

class Header extends Component {
  onChangeTheme = () => {
    this.props.toggleTheme();
  }
  render() {
    return (
      <div className={module.root} >
        <div className={module.header} >
          <div className={module.logo} >
            <div className={module.logoItem} >
              <div className={module.logoTitle} >Rocket</div>
              <div>
                <ROCKET className={module.logoIcon}/>
              </div>
            </div>
          </div>
          <div className={module.navItems} >
            <div className={module.navItemTheme}  >
              <div>Dark mode</div>
              {this.props.mode !== 'LIGHT' ? <TOGGLE_ON className={module.navIcon} onClick={this.onChangeTheme} /> : <TOGGLE_OFF className={module.navIcon} onClick={this.onChangeTheme} />}
            </div>
            {this.props.hide ? null : 
              <div className={module.navItem} onClick={() => this.props.history.replace('/signout')} >
                <div>Logout</div>
                <SIGNOUT className={module.navIcon}/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
import React, { Component } from 'react';

import module from './MobileHeader.module.css';
import { SETTING, SORT_ASC, SORT_DESC } from '../../util/icons';

class MobileHeader extends Component {
  render() {
    return (
      <div className={module.root} >
        <div className={module.title} >
          <div className={module.titleText} >
            {this.props.username}
          </div>
        </div>
        <div className={module.icon} onClick={this.props.onSortClick} >
          {this.props.order ? <SORT_DESC /> : <SORT_ASC />}
        </div>
        <div className={module.icon} onClick={this.props.onDrawerClick} >
          <SETTING />
        </div>
      </div>
    );
  }
}

export default MobileHeader;
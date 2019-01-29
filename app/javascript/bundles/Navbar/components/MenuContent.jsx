import React, { Component } from 'react'
import axios from 'axios'


class MenuContent extends Component {
  constructor(props) {
    super(props)
  }
   handleLogout = () => {
const link = document.createElement('a');
link.setAttribute('href', '/users/sign_out');
link.setAttribute('rel', 'nofollow');
link.setAttribute('data-method', 'delete');
document.body.appendChild(link);
link.click();
}

  render() {
    return (
      <div className="grandMenu">
          <div className="menu">
            <div className="signButton">
              <button id="signOutButton" onClick={this.handleLogout}>Sign Out</button>
            </div>
            <div className="">
              
            </div>
          </div>
            <p className="hint">
            </p>
        </div>
    )
  }
}


export default MenuContent
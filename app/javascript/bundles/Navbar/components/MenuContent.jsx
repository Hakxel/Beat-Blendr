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
          <div className="textinsidepop">
            <p>Welcome to Beat Blendr!</p>
            <p>To get started just hit the generate Playlist and we will provide you with what is popular near you, based on who is near you! Don't worry, this is done completely anonymously.</p>
            <ul className='menu--main'>
              <li>Settings
                <ul className='sub-menu'>
                  <li>Change E-mail</li>
                  <li>Unlink Spotify</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
          <p className="hint">
          </p>
      </div>

    )
  }
}


export default MenuContent

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
            <p>This is an app that creates and lets you listen to new playlists based on your current location and the people within a range of 5 miles or less.</p>
            <p>In order to do that, we collect the favorite tracks of every user, including you, and anonymously mix them on the playlist of other users nearby.</p>
            <p>To get started just hit the Generate Playlist button and we will provide you with what is popular near you, based on who is near you!</p>
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

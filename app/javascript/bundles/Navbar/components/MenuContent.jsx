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
            <p>Welcome!</p>
            
            <p>BeatBlendr is an app that lets you sample music based on the preferences of nearby users!</p>
            
            <p>With one click, create a new Spotify playlist containing the favorite tracks of users within your specified search radius.</p>
            
            <p>You can filter the BeatBlendr playlist generator to return danceable or relaxing music!</p>
            
            <p>Throwing a party? Having some friends over for dinner? Maybe you just want some new tunes blasting in your headphones.</p>
            
            <p>Whatever your occasion, BeatBlendr has you covered!</p>
            
            <p>To get started, just hit the Generate Playlist button.</p>
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
      </div>

    )
  }
}


export default MenuContent

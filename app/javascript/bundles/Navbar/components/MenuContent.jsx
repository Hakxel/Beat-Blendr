import React, { Component } from 'react'

// import './menuContent.scss'

class MenuContent extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="menu">
          <div className="menu">
            <div onClick={this.onLogout} className="Logout">
              Log Out
            </div>
            <p className="hint">
              Click outside the menu to close it, or swipe.
            </p>
        </div>
          // <a href=''></a>
          // <%= link_to "Logout", destroy_user_session_path, method: :delete %>
      </div>

        <p className="hint">Click outside the menu to close it, or swipe it closed on touch device</p>
      </div>
    )
  }
}

export default MenuContent

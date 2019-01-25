import React, { Component } from 'react'
import axios from 'axios'

class Player extends Component {
  state = {
    userId: this.props.userId,
    playlistSrc: `https://open.spotify.com/embed/playlist/${this.props.playlistId || "78Jsi7l1WpSuvQGUjfI72L"}`
  }

  // fetchPlaylist = (userId) => {
  // const { data } = axios.get(`/pages/${userId}`)
  // .then( this.setState({ playlistId: data.playlistId }) 
  // )}

  // componentDidMount(){
  //   fetchPlaylist(this.state.userId)
  // }


  render(){
    const {playlistSrc} = this.state
    return(
      <div>
        <h1>Hello from the player</h1>
        <iframe src={playlistSrc} width="300" height="380" frameborder="2" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}

export default Player
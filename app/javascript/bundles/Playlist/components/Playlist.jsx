import React, { Component } from 'react'
import axios from 'axios'

export default class Playlist extends Component {
  state = { playlistId: this.props.playlistId || '' }

  generatePlaylist = () => {
    axios.post('/playlists.json')
      .then(response => {
        this.setState({ playlistId: response.data.playlistId })
      })
  }

  render(){
    const { playlistId } = this.state
    if(!playlistId){
      return(
        <button className="Currentplayer" onClick={this.generatePlaylist}>
          Generate Playlist
        </button>
      )
    }else{
      return(
        <iframe className="Spotifyplayer"
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="300"
          height="380"
          frameborder="2"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )
    }
  }
}

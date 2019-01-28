import React, { Component } from 'react'
import axios from 'axios'

export default class Playlist extends Component {
  state = {
            playlistType: 'all',
            playlistId: this.props.playlistId || ''
          }

  generatePlaylist = () => {
    const { playlistType } = this.state
    axios.post('/playlists.json', { playlistType })
      .then(response => {
        this.setState({ playlistId: response.data.playlistId })
      })
  }

  handleChange = event => {
    this.setState({ playlistType: event.target.value })
  }

  render(){
    const { playlistId, playlistType } = this.state
    if(!playlistId){
      return(
        <div>
          <select
            onChange={this.handleChange}
            value={playlistType}
          >
            <option value="all">All</option>
            <option value="party">Party</option>
            <option value="chill"> Chill</option>
          </select>

          <button onClick={this.generatePlaylist}>
            Generate Playlist
          </button>
        </div>
      )
    }else{
      return(
        <div>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="300"
            height="380"
            frameborder="2"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>

          <select
            onChange={this.handleChange}
            value={playlistType}
          >
            <option value="all">All</option>
            <option value="party">Party</option>
            <option value="chill"> Chill</option>
          </select>

          <button onClick={this.generatePlaylist}>
            Refresh Playlist
          </button>
        </div>

      )
    }
  }
}

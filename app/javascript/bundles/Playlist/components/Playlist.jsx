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
        <button onClick={this.generatePlaylist}>
          Generate Playlist
        </button>
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

          <form onSubmit={this.handleSubmit} >
            <h3>Select Playlist Type</h3>
            <div>
              <p>All</p>
              <input type="radio" name="radio" value="all" onChange={this.handleChange} checked={ true }/>
              <p>Party</p>
              <input type="radio" name="radio" value="party" onChange={this.handleChange}/>
              <p>Chill</p>
              <input type="radio" name="radio" value="chill" onChange={this.handleChange}/>
            </div>
          </form>

          <button onClick={this.generatePlaylist}>
            Refresh Playlist
          </button>
        </div>

      )
    }
  }
}

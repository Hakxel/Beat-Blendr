import React, { Component } from 'react'
import axios from 'axios'

export default class Playlist extends Component {
  state = {
            playlistType: this.props.playlistType || 'all',
            playlistId: this.props.playlistId || '',
            loading: false
          }

  generatePlaylist = () => {
    const { playlistType } = this.state
    this.setState({loading: true})
    axios.post('/playlist.json', { playlistType })
      .then(response => {
        this.setState({
          playlistId:   response.data.playlistId,
          playlistType: response.data.playlistType,
          loading: false
        })
      })
  }

  refreshPlaylist = () => {
    this.setState({ loading: true })
    axios.delete('/playlist.json').then( _ => this.generatePlaylist() )
  }

  handleChange = event => {
    this.setState({ playlistType: event.target.value })
  }

  render(){
    const { playlistId, playlistType } = this.state
    console.log(playlistType)
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
            { this.state.loading ? 'Loading...' : 'Generate Playlist' }
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
            frameBorder="2"
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

          <button onClick={this.refreshPlaylist}>
            { this.state.loading ? 'Loading...' : 'Refresh Playlist' }
          </button>
        </div>

      )
    }
  }
}

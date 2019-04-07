import React, { Component } from 'react'
import axios from 'axios'
import ArtistCloud from './ArtistCloud'

const csrfHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': ReactOnRails.authenticityToken()
}

export default class Playlist extends Component {
  state = {
            playlistType: this.props.playlistType || 'all',
            playlistId: this.props.playlistId || '',
            loading: false,
            latitude: null,
            longitude: null,
            playerWidth: window.innerWidth < 500 ? 450 : 0.7465 * window.innerWidth,
            playerHeight: window.innerHeight * 0.7,
            range: this.props.range || 100,
            artists: []
          }

  componentDidMount() {
    this.trackLocation()
    this.interval = setInterval(this.trackLocation, 60000);
    window.addEventListener('beforeunload', this.handleLeavePage)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.interval)
  }

  handleLeavePage = () => {
    clearInterval(this.interval)
    axios.post(
      '/locations',
      { location: { latitude: null, longitude: null } },
      { headers: csrfHeaders }
    )
  }

  trackLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 27000
    }
    const success = pos => {
      const { latitude, longitude } = pos.coords
      axios.post(
        '/locations',
        { location: { latitude, longitude } },
        { headers: csrfHeaders }
      ).then(response => {
        this.setState({
          latitude: response.data.latitude,
          longitude: response.data.longitude
        })
      })
      axios.get(`/artists.json?latitude=${latitude}&longitude=${longitude}`)
        .then(response => this.setState({ artists: response.data }) )
    }
    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  handleResize = () => {
    const { innerHeight, innerWidth } = window
    this.setState({
      playerHeight: 0.7 * innerHeight,
      playerWidth: innerWidth < 500 ? 420 : 0.8 * innerWidth
    })
  }

  generatePlaylist = () => {
    const { playlistType, range } = this.state
    console.log('before', this.state)
    this.setState({loading: true})
    console.log('middle', this.state)
    axios.post('/playlist.json', { playlistType, range })
      .then(response => {
        this.setState({
          playlistId:   response.data.playlistId,
          playlistType: response.data.playlistType,
          range:        response.data.generationRange,
          loading: false,
        })
        console.log('afterResponse', this.state)
      })
    console.log('end', this.state)
  }

  refreshPlaylist = (event) => {
    this.setState({ loading: true })
    axios.delete('/playlist.json').then( _ => this.generatePlaylist() )
  }

  handleChange = event => {
    this.setState({ playlistType: event.target.value })
  }

  handleRangeChange = event => {
    this.setState({ range: event.target.value })
  }

  render(){
    const { playlistId, playlistType, latitude, longitude } = this.state
    if(latitude && longitude){
      return(
        <div className="spotifycontainer">
          <div className="player-frame">
            {
              playlistId &&
              <iframe
                id="Spotifyplayer"
                className="spotify-player"
                src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                width={'100%'}
                height={'100%'}
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            }          
          </div>
          <div className="playlist-control">
            <div className="type-select">
              <select name="dropdown" className="list-options"
                onChange={this.handleChange}
                value={playlistType}
              >
                <option value="all">All</option>
                <option value="party">Party</option>
                <option value="chill"> Chill</option>
              </select>
              <button onClick={ playlistId ? this.refreshPlaylist : this.generatePlaylist } id="refreshbtn">
                {
                  this.state.loading ? 'Loading...' :
                  this.state.playlistId ? 'Refresh Playlist' : 'Generate Playlist'
                }
              </button>
            </div>
            <div className="select-distance">
              <p>Select distance: </p>
              <div className="distance-bar">
                <input type="range" id="range-input" name="distance"
                  min="100" max="26400" step="100" value={this.state.range} onChange={this.handleRangeChange}/>
                <br/>
                <label htmlFor="distance"> {this.state.range} Feet ({(this.state.range/5280).toFixed(2)} miles)</label>
              </div>
            </div>
            {
              !playlistId && this.state.artists.length > 0 && <div className="artist-cloud"><ArtistCloud artists={this.state.artists} /></div>
            }
          </div>
        </div>
      )
    }else{
      return <p>Please wait while we find your location...</p>
    }
  }
}

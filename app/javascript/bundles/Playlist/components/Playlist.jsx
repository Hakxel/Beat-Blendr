import React, { Component } from 'react'
import axios from 'axios'

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
            playerHeight: window.innerHeight * 0.8
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
    }
    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  handleResize = () => {
    const { innerHeight, innerWidth } = window
    this.setState({
      playerHeight: 0.8 * innerHeight,
      playerWidth: innerWidth < 500 ? 450 : 0.8 * innerWidth
    })
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
    const { playlistId, playlistType, latitude, longitude } = this.state
    if(latitude && longitude){
      return(
        <div className="spotifycontainer">
          {
            playlistId &&
            <iframe
              id="Spotifyplayer"
              className="spotify-player"
              src={`https://open.spotify.com/embed/playlist/${playlistId}`}
              width={this.state.playerWidth}
              height={this.state.playerHeight}
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          }
          <select name="dropdwn"
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
      )
    }else{
      return <p>Please wait while we find your location...</p>
    }
  }
}

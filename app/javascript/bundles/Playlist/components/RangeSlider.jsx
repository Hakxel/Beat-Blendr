import React from 'react'

class RangeSlider extends React.Component {
  constructor(props){

    this.state = {
      range: this.props.range
    }
  }

  render() {
    return(
      <div>
        <p>Playlist range:</p>
        <div>
          <input type="range" id="start" name="distance"
            min="0" max="2" />
            <p>{this.state.range}</p>
            <label for="distance">Distance</label>
        </div>
      </div>
    )
  }

}

export default RangeSlider
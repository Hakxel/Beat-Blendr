import React, { Component } from 'react'
import TagCloud from 'react-tag-cloud'
import randomColor from 'randomcolor'

const styles = {
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
}

export default class ArtistCloud extends Component {
  componentDidMount(){
    this.interval = setInterval(() => {this.forceUpdate()}, 3000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className='cloud-outer'>
        <div className='cloud-inner'>
          <h1>Users nearby listen to...</h1>
          <TagCloud
            className='tag-cloud'
            style={{
              fontFamily: 'sans-serif',
              fontSize: 30,
              color: () => randomColor({
                hue: 'blue'
              }),
              padding: 5,
            }}>
            <div
              style={{
                fontFamily: 'serif',
                fontSize: 40,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: randomColor()
              }}>{this.props.artists[0]}</div>
            <div style={styles.large}>{this.props.artists[1]}</div>
            <div style={styles.large}>{this.props.artists[2]}</div>
            <div style={styles.large}>{this.props.artists[3]}</div>
            <div style={styles.large}>{this.props.artists[4]}</div>
            <div style={{fontFamily: 'courier'}}>{this.props.artists[5]}</div>
            <div style={{fontSize: 30}}>{this.props.artists[6]}</div>
            <div style={{fontStyle: 'italic'}}>{this.props.artists[7]}</div>
            <div style={{fontWeight: 200}}>{this.props.artists[8]}</div>
            <div style={{color: 'green'}}>{this.props.artists[9]}</div>
            <div>{this.props.artists[10]}</div>
            <div>{this.props.artists[11]}</div>
            <div>{this.props.artists[12]}</div>
            <div style={styles.small}>{this.props.artists[13]}</div>
            <div style={styles.small}>{this.props.artists[14]}</div>
            <div style={styles.small}>{this.props.artists[15]}</div>
            <div>{this.props.artists[16]}</div>
            <div>{this.props.artists[17]}</div>
            <div style={styles.small}>{this.props.artists[18]}</div>
            <div style={styles.small}>{this.props.artists[19]}</div>
            <div style={{color: 'green'}}>{this.props.artists[20]}</div>
          </TagCloud>
        </div>
      </div>
    );
  }
}

import React from 'react'
import TagCloud from 'react-tag-cloud';

export default class ArtistCloud extends React.Component {
  render() {
    return (
      <TagCloud
        style={{
          fontFamily: 'sans-serif',
          fontSize: 30,
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: 'green',
          padding: 5,
          width: '100%',
          height: '100%'
        }}>
        {this.props.artists.map(artist => {
          return <div style={{fontSize: 50}}>{artist}</div>
        })}
      </TagCloud>
    );
  }
}

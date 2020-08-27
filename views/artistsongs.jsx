
import React from 'react'


export default class Artistsongs extends React.Component {
    render(){

    const songArr = this.props.songs;
    const artist = this.props.artist;




let songList = songArr.map((song)=> {
        return <li>{song.title}</li> })

        return (
        <html>
        <head/>
        <body>
          <div>
            <h1>song list by{artist.name}</h1>
            <ul>{songList}</ul>

          </div>
        </body>
      </html>
            );
    }
}
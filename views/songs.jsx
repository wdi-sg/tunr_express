var React = require('react');
var Song = require('./song.jsx');

class Songs extends React.Component {
    render() {

    const songList = this.props.songs.map((song)=>{
        return <Song song={song}/>
    });

    return (
      <html>
        <body>
         <div>
            <h1>Songs of the artist : {songList[0].name}</h1>
          </div>

          <div>
            <ul>{songList}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Songs;
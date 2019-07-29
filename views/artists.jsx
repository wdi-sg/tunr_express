var React = require('react');
var Artist = require('./artist.jsx');

class Artists extends React.Component {
    render() {

    const artistList = this.props.artists.map((artist)=>{
        return <Artist artist={artist}/>
    });

    return (
      <html>
        <body>
         <div>
            <h1>A List Of Artists</h1>
          </div>

          <div>
            <ul>{artistList}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
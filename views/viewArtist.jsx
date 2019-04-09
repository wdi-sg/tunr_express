var React = require("react");

class ViewArtist extends React.Component {
    render() {
        let artist = this.props.artist;
        return (
            <html>
        <head>
            <title>{artist.name}</title>
        </head>
        <body>
            <div className="displayContainer">
                <h1>{artist.name}</h1>
                <p>{artist.nationality}</p>
                <img src={artist.photo_url}/>
            </div>
        </body>
      </html>
        )
    }
}

module.exports = ViewArtist;
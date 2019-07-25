var React = require("react");

class Songlist extends React.Component {
  render() {

        const songs = this.props.songsList.map(song =>{

            return (
                <li><a href="">{song.title}</a></li>
                )


        })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/songlist.css"/>
        </head>
        <body>
          <h3>Songs by {this.props.artists.name}</h3>
            <div className="wrapper_new">
                {songs}
            </div>
            <p><a href={`/artists/${this.props.artists.id}/songs/new`}>Add a new song</a></p>
            <a href="/artists/"><p>Home</p></a>

        </body>
      </html>
    );
  }
}

module.exports = Songlist;

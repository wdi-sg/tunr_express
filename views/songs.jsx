var React = require('react');

class Songpage extends React.Component {
  render() {
    let artistPage = "/artists/" + this.props.rows[0].id;

    const songCards = this.props.rows.map(song =>{

        return (
                <div className="song-card">
                    <a href={artistPage}>
                        <p>{song.title}</p>
                        <p>{song.album}</p>
                        <audio controls>
                            <source src={song.preview_link} type="audio/mpeg"/>
                            Your browser does not support the audio tag.
                            </audio>
                    </a>
                </div>
        )
    });

    return (
        <html>
        <head>
            <title>Songs by {this.props.rows[0].name}</title>
            <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <h1>{this.props.rows[0].name}</h1>
        <img className="solo-artist" src={this.props.rows[0].photo_url}/>
        </header>
        <body>
            <div id="song-container">
                {songCards}
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Songpage;
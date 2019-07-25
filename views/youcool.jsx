var React = require('react');

class Artistspage extends React.Component {
  render() {

    const artistCards = this.props.rows.map(artist =>{
        let artistPage = "/artists/" + artist.id;
        let imgStyle = {
                backgroundImage: "url(" + artist.photo_url  + ")"
            };

        return (
                <div className="artist-card">
                    <a href={artistPage}>
                        <div className="img-thumbnail" style={imgStyle}></div>
                        <p>{artist.nationality}</p>
                        <h2>{artist.name}</h2>
                    </a>
                </div>
        )
    });

    return (
        <html>
        <head>
            <title>Artists Page</title>
            <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <ul>
            <li><a href="/artists">Home</a></li>
            <li><a href="/artists/new">Add Artist</a></li>
        </ul>
            <img id="logo" src="logo.png"/>
        </header>
        <body>
            <div id="artist-container">
                {artistCards}
            </div>
        <footer>
            <p>Made with Love by Elise</p>
        </footer>
        </body>
        </html>
    );
  }
}

module.exports = Artistspage;
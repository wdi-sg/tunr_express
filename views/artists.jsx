var React = require('react');

class Artistspage extends React.Component {
  render() {

    const artistCards = this.props.rows.map(artist =>{
        // let pokePage = "/pokemon/" + pokemon.num;
        return (
                <div className="artist-card">
                        <img src={artist.photo_url}/>
                        <p>{artist.nationality}</p>
                        <h2>{artist.name}</h2>
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
        <h1>Artists Page</h1>
        </header>
        <body>
            <div id="artist-container">
                <p>{artistCards}</p>
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Artistspage;
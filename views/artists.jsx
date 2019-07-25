var React = require('react');

class Artistspage extends React.Component {
  render() {

    const artistCards = this.props.rows.map(artist =>{
        let artistPage = "/artists/" + artist.id;
        return (
                <div className="artist-card">
                    <a href={artistPage}>
                        <img src={artist.photo_url}/>
                        <p>{artist.nationality}</p>
                        <h2>{artist.name}</h2>
                        //gradient underline applied to h2
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
            <li><a href="default.asp">Home</a></li>
            <li><a href="news.asp">News</a></li>
            <li><a href="contact.asp">Contact</a></li>
            <li><a href="about.asp">About</a></li>
        </ul>
            <img id="logo" src="logo.png"/>
        </header>
        <body>
            <div id="artist-container">
                {artistCards}
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Artistspage;
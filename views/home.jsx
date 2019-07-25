var React = require("react");


class Home extends React.Component {
  render() {


    const artistBox = this.props.artists.map(artist =>{



        return (
                <div className="artist-box">
                        <a href={`/artists/${artist.id}`}><img src={artist.photo_url}/></a>
                        <p>{artist.nationality}</p>
                        <h2>{artist.name}</h2>
                </div>
        )
    })

    return (
      <html>
        <head>
            <title>Artists Page</title>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/home.css"/>
        </head>
        <body>
            <h1>Artists' List</h1>
            <div className="wrapper">
                {artistBox}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;

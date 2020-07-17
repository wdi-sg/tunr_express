var React = require("react");


class Home extends React.Component {
  render() {


    const artistBox = this.props.artists.map(artist =>{

        let bkgrd = {backgroundImage:`url(${artist.photo_url})`};

        return (
                <div className="artist-box">
                    <a href={`/artists/${artist.id}`}><div style={bkgrd} className="img_wrapper"></div></a>
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
            <div className="header">
                <h1>Artists' List</h1>
                <p className="login"><a href="/login">Login</a>&nbsp;|&nbsp;<a href="/register">Register</a></p>
            </div>
            <div className="wrapper">
                {artistBox}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;

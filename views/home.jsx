var React = require("react");

class Home extends React.Component {
  render(){
    console.log(this.props.artists)
  let artistArray = this.props.artists.map(artist => {
    return( <li><a href={"/home/"+artist.id}>{artist.name}</a>
        <a href={'#'}><img src={artist.photo_url}/></a>
        <p>Name: {artist.name}</p>
        <p>Nationality: {artist.nationality}</p></li>
  //   })
    );
});

    return (
        <html>
        <head>
            <link rel={"stylesheet"} href={`/style.css`} />
        </head>
            <body>
              <h1>Welcome!</h1>
                <ul>
                    {artistArray}
                </ul>
            </body>
        </html>
        );
    }
};

module.exports = Home;
var React = require("react");

class Home extends React.Component {
  render() {

    let artists = this.props.artists;

    let artistsList = artists.map(artistsData =>{

        let url = '/artist/'+ artistsData.id

        return(

            <a href = {url}>
                <div key={artistsData.id} className = "artistCards">
                    <img src = {artistsData.photo_url} className = 'artistImg'/>
                    <p>Artist's Id: {artistsData.id}</p>
                    <p>Artist's Name: {artistsData.name}</p>
                    <p>Artist's Nationality: {artistsData.nationality}</p>
                </div>
            </a>

        )
    });

    return (
      <html>

        <head>
            <link rel = "stylesheet" type = "text/css" href = "/css/style.css"/>
        </head>

        <body>

            <div className = "container">

                <h1>All Artists</h1>

                <div className = "artists">
                    {artistsList}
                </div>

            </div>

        </body>
      </html>
    );
  }
}

module.exports = Home;
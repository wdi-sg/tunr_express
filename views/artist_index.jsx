var React = require("react");

class ArtistIndex extends React.Component {
    render() {
        // let data = this.props.artists;
        // console.log("home.jsx", data);
        const all_artists = this.props.artists.map(artist => {
            return (
                <React.Fragment>
                <h1>{ artist.name }</h1>
                <h2>{ artist.nationality }</h2>
                <img src={ artist.photo_url } style={{display: 'inline-block', width: '40%', height: '50%'}} />
                <br/>
                <span>
                <a href={`/artists/${artist.id}`} class="btn btn-primary">View artist</a>&nbsp;&nbsp;&nbsp;
                <a href={`/artists/${artist.id}/edit`} class="btn btn-warning">Edit artist</a>&nbsp;&nbsp;&nbsp;
                <a href={`/artists/${artist.id}/delete`} class="btn btn-danger">Delete artist</a>
                </span>
                <br/><br/><br/><br/>
                </React.Fragment>
            )
        })

        return (
            <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/indexstyle.css"/>
                <title>Index Page</title>
            </head>
        <body>
          <div class="content">
          <h1 style={{ 'text-decoration': 'underline' }}>Artists!</h1>
          <span>
          <a href={"/artists/new"} class="btn btn-success">Create new artist</a>
          </span>
          <br/><br/>
          { all_artists }
          </div>
        </body>
      </html>
        );
    }
}

module.exports = ArtistIndex;
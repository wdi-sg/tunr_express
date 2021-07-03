var React = require("react");

// EditArtistButton redirects to /artist/:id/edit
class EditArtistButton extends React.Component {
    render() {
        let id = parseInt(this.props.id);
        // console.log("id is: "+ id);
        let goWhere = "/artist/"+id+"/edit";
        // console.log("goWhere: "+ goWhere);
        return (
            <div>
                <form method="get" action={goWhere}>
                <input type="submit" value="Edit artist"/>
                </form>
            </div>
        )
    }
};

// DeleteArtistButton redirects to /artist/:id/delete
class DeleteArtistButton extends React.Component {
    render() {
        let id = parseInt(this.props.id);
        // console.log("id is: "+ id);
        let goWhere = "/artist/"+id+"/delete";
        // console.log("goWhere: "+ goWhere);
        return (
            <div>
                <form method="get" action={goWhere}>
                <input type="submit" value="Delete artist"/>
                </form>
            </div>
        )
    }
};

// BackToHome redirects to /
class BackToHome extends React.Component {
    render() {
        return (
            <div>
                <form method="get" action="/">
                <input type="submit" value="Back to Home"/>
                </form>
            </div>
        )
    }
};

class ViewArtist extends React.Component {
    render() {
        let artist = this.props.artist;
        // console.log(artist.id)
        return (
            <html>
        <head>
            <title>{artist.name}</title>
            <link rel="stylesheet" type="text/css" href="/style.css"></link>
        </head>
        <body>
            <div className="displayContainer">
                <h1>{artist.name}</h1>
                <p>{artist.nationality}</p>
                <img src={artist.photo_url} className="viewArtistImage"/>
            </div>
            <EditArtistButton id={artist.id}/>
            <DeleteArtistButton id={artist.id}/>
            <BackToHome/>
        </body>
      </html>
        )
    }
}

module.exports = ViewArtist;
var React = require("react");
// maybe merge with createArtist??

// CancelEditButton redirects to /artist/:id/
class CancelEditButton extends React.Component {
    render() {
        let id = parseInt(this.props.id);
        console.log("id is: "+ id);
        let goWhere = "/artist/"+id;
        console.log("goWhere: "+ goWhere);
        return (
            <div>
                <form method="get" action={goWhere}>
                <input type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }
};

class EditArtist extends React.Component {
    render() {
        let artist = this.props.artist;
        let action = "/artist/"+artist.id+"/put?_method=PUT";
        return (
            <html>
                <head>
                    <title>Edit {artist.name}</title>
                </head>
                <body>
                    <div className="displayContainer">
                        <h1>Edit {artist.name}</h1>
                        <h4>Provide {artist.name}'s new details here:</h4>
                        <form method="POST" action={action}>
                Name: <input type="text" defaultValue={artist.name} name="name"/>
                Image link: <input type="text" defaultValue={artist.photo_url} name="photo_url" placeholder="URL of artist's image"/>
                Nationality: <input type="text" defaultValue={artist.nationality} name="nationality"/>
                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
                    </div>
                    <CancelEditButton id={artist.id}/>
                </body>
            </html>
        )
    }
}

module.exports = EditArtist;
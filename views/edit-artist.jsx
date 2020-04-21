var React = require("react");

//new artist form page to include dropdown for nationality
console.log("Edit Artist Form Page Accessed");
console.log("------------------");

class EditArtist extends React.Component {
    render() {
        // console.log(this.props.rows);
        var artist = this.props.rows;
        var artistID = artist[0].id;
        var editedArtistLink = '/artists/' + artistID;
        // console.log(editedArtistLink.toString())
        var artistName = artist[0].name;
        var artistPhoto = artist[0].photo_url;
        var artistNationality = artist[0].nationality;

        return (
            <html>
                <head />
                <body>
                    <h1>Edit Artist</h1>
                    <div>
                        <form action={editedArtistLink.toString()} method="POST">
                            <p>
                                Name <input name="name" value={artistName} />
                            </p>
                            <p>
                                Photo <input name="photo_url" value={artistPhoto} />
                            </p>
                            <p>
                                Nationality <input name="nationality" value={artistNationality} />
                            </p>
                            <p>
                                <input type="submit" />
                            </p>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = EditArtist;

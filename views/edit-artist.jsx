var React = require ('react');

class EditArtist extends React.Component {
    render() {

        const editArtist = this.props.artist;
        const actionPath = `/recipes/${editArtist.id}?_method=PUT`;
        return(
            <html>
                <body>
                    <h2> Edit Artist </h2>
                    <form action={actionPath} method="post">
                            <label>Artist Name:</label>
                            <input type="text" name="name" defaultValue={editArtist.name}/>
                            <label>Photo:</label>
                            <input className="edit-input" type="photo_url" name="title" defaultValue={editArtist.photo_url}/>
                            <label>Nationality:</label>
                            <input type="text" name="nationality" defaultValue={editArtist.nationality}/>
                            <button type="submit" >Update Artist</button>
                    </form>
                </body>
            </html>
        )
    }
}

module.exports = EditArtist;
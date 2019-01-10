var React = require ('react');

class EditArtist extends React.Component {
    render() {

        const editArtist = this.props.artist;

        const details = editArtist.map ((content, index)=>{
            let actionPut = `/artist/${content.id}?_method=PUT`;
            let actionDelete = `/artist/${content.id}?_method=DELETE`;
            return <div>
                    <h2 key={index}> Edit Artist </h2>
                    <form action={actionPut} method="post">
                            <label>Artist Name:</label>
                            <input type="text" name="name" defaultValue={content.name}/>
                            <label>Photo:</label>
                            <input className="edit-input" type="photo_url" name="photo_url" defaultValue={content.photo_url}/>
                            <label>Nationality:</label>
                            <input type="text" name="nationality" defaultValue={content.nationality}/>
                            <button><a href="/artists/">Home</a></button>
                            <button type="submit" >Update Artist</button>
                            <form method="POST" action={actionDelete}>
                                <button> delete </button>
                            </form>
                    </form>

                    </div>
        })
        return(
            <html>
                <body>
                    {details}
                </body>
            </html>
        )
    }
}

module.exports = EditArtist;
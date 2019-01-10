var React = require ('react');

class EditArtist extends React.Component {
    render() {

        const editArtist = this.props.artist;

        const details = editArtist.map ((content, index)=>{
            let actionPath = `/artist/${content.id}?_method=PUT`;
            return <div>
                    <h2 key={index}> Edit Artist </h2>
                    <form action={actionPath} method="post">
                            <label>Artist Name:</label>
                            <input type="text" name="name" defaultValue={content.name}/>
                            <label>Photo:</label>
                            <input className="edit-input" type="photo_url" name="title" defaultValue={content.photo_url}/>
                            <label>Nationality:</label>
                            <input type="text" name="nationality" defaultValue={content.nationality}/>
                            <button type="submit" >Update Artist</button>
                            <button><a href="/artists/">Home</a></button>
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
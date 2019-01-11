var React = require ('react');
var DefaultLayout = require ('./default');

class EditSong extends React.Component {
    render() {

        const editSong = this.props.song;

        const details = editSong.map ((content, index)=>{

            let actionPut = `/song/${content.id}?_method=PUT`;
            let actionDelete = `/song/${content.id}?_method=DELETE`;
            return <div key={index}>
                    <h2> Edit Song </h2>
                    <form action={actionPut} method="post">
                            <label>Song Title:</label>
                            <input type="text" name="title" defaultValue={content.title}/> <br/>
                            <label>Song Album:</label>
                            <input type="text" name="album" defaultValue={content.album}/> <br/>
                            <label>Preview Link:</label>
                            <input type="text" name="preview_link" defaultValue={content.preview_link}/> <br/>
                            <label>Artwork Link:</label>
                            <input type="text" name="artwork" defaultValue={content.artwork}/> <br/>
                            <label>Artist Id:</label>
                            <input type="text" name="artist_id" defaultValue={content.artist_id}/> <br/>
                            <button type="submit" >Update Song</button>
                            <form method="POST" action={actionDelete}>
                                <button> delete </button>
                            </form>
                    </form>
                    </div>
        })
        return(
            <DefaultLayout>
                {details}
            </DefaultLayout>

        )
    }
}

module.exports = EditSong;
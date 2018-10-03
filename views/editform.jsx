var React = require('react');

class editform extends React.Component {
    render() {

        let artist = this.props.artist[0];

        let actionURL = '/artists/' + artist.id + '?_method=PUT';

        let deleteURL = '/artists/' + artist.id + '?_method=DELETE';

        return (
            <div>
                <h1>Edit Artist</h1>
                <form method="POST" action={actionURL}>
                    <input name="name" value={artist.name}/><br/>
                    <input name="photo_url" value={artist.photo_url}/><br/>
                    <input name="nationality" value={artist.nationality}/><br/>
                    <input type="submit"/>
                </form>
                <h1>Delete Artist</h1>
                <form method="POST" action={deleteURL}>
                    <input name="id" type="hidden" value={artist.id}/>
                    <input type="submit" value="Delete This"/>
                </form>
            </div>
            )
    }
}

module.exports = editform;
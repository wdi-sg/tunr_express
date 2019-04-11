var React = require('react');
var DefaultLayout = require('./layouts/default');

class AddSong extends React.Component {
  render() {
    return (
        <DefaultLayout title="Add New Song">
            <form method="POST" action= { `/artists/${ this.props.artist.id }/songs` }>
                <h1>Add New Song for { this.props.artist.name } </h1>
                Title: <input className="form-control" name="title"/><br/>
                Album: <input className="form-control" name="album"/><br/>
                Preview Link: <input className="form-control" name="preview_link"/><br/>
                Artwork: <input className="form-control" name="artwork"/><br/>
                <input type="hidden" name="artist_id" value= { this.props.artist.id }/>
                <input className="btn btn-primary" type="submit" value="Add new Song"/>
            </form>
        </DefaultLayout>
    );
  }
}

module.exports = AddSong;
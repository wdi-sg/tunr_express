var React = require('react');
var DefaultLayout = require('./layouts/default');

class DeleteArtist extends React.Component {
  render() {

    let formAttribute = `/artists/${this.props.artist.id}?_method=DELETE`;

    return (
            <DefaultLayout title="Delete Existing Artist">
                <form method="POST" action={ formAttribute }>
                    <h1>Delete Existing Artist</h1>
                    Name: <label> { this.props.artist.name } </label><br/>
                    Photo URL: <label> { this.props.artist.photo_url } </label><br/>
                    Nationality: <label> { this.props.artist.nationality } </label><br/>
                    <input type="hidden" name="id" value= { this.props.artist.id } /><br/>
                    <input className="btn btn-danger" type="submit" value="Do you really want to delete existing Artist?"/>
                </form>
            </DefaultLayout>
    );
  }
}

module.exports = DeleteArtist;
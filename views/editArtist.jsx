var React = require('react');
var DefaultLayout = require('./layouts/default');

class EditArtist extends React.Component {
  render() {

    let formAttribute = `/artists/${this.props.artist.id}?_method=PUT`;
    console.log(this.props)
    return (
        <DefaultLayout title="Edit Existing Artist">
            <form method="POST" action={ formAttribute }>
                <h1>Edit Existing Artist</h1>
                Name: <input className="form-control" name="name" value={ this.props.artist.name }/><br/>
                Photo URL: <input className="form-control" name="photo_url" value={ this.props.artist.photo_url }/><br/>
                Nationality: <input className="form-control" name="nationality" value={ this.props.artist.nationality }/><br/>
                <input className="btn btn-primary" type="submit" value="Edit existing Artist"/>
            </form>
        </DefaultLayout>
    );
  }
}

module.exports = EditArtist;
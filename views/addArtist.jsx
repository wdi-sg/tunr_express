var React = require('react');
var DefaultLayout = require('./layouts/default');

class AddArtist extends React.Component {
  render() {
    return (
        <DefaultLayout title="Add New Artist">
            <form className="add" action="/artists" method="POST">
                <h1>Add New Artist</h1>
                Name: <input className="form-control" name="name"/><br/>
                Photo URL: <input className="form-control" name="photo_url"/><br/>
                Nationality: <input className="form-control" name="nationality"/><br/>
                <input className="btn btn-primary" type="submit" value="Add new Artist"/>
            </form>
        </DefaultLayout>
    );
  }
}

module.exports = AddArtist;
var React = require("react");
var DefaultLayout = require("./layouts/default");

class Edit extends React.Component {
    render() {
      const artist = this.props.artist;
      const putsURL = `/artists/${artist.id}?_method=PUT`;
        return (<DefaultLayout loggedIn={this.props.loggedIn} title="EDIT">
                    <h1>Edit entry for {artist.name}</h1>
                    <form action={putsURL} method="POST">
                        name:
                        <input type="text" name="name" defaultValue={artist.name}/><br/>
                        photo_url:
                        <input type="text" name="photo_url" defaultValue={artist.photo_url}/><br/>
                        nationality:
                        <input type="text" name="nationality" defaultValue={artist.nationality}/><br/>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </DefaultLayout>);
    }
}

module.exports = Edit;

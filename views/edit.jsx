var React = require('react');

class Edit extends React.Component {
    render() {
        //console.log("THIS.PROPS FOR EDIT: ", this.props.artist[0]);

        let artistID = this.props.artist[0].id;
        let actionUrl = '/artists/' + artistID + '?_method=PUT';

        return (
          <div>
            <h1>Edit artist</h1>
            <form method="POST" action={actionUrl}>
                <p>Name of artist: </p>
                <input name="name" value={this.props.artist.name}/>
                <p>Photo URL of artist: </p>
                <input name="url" value={this.props.artist.photo_url}/>
                <p>Nationality of artist</p>
                <input name="nationality" value={this.props.artist.nationality}/>
                <br/>
                <input type="submit" />
            </form>
          </div>
        );
    }
}

module.exports = Edit;
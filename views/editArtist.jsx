var React = require("react");
const Template = require('./template.jsx');

class EditArtist extends React.Component {
  render() {
    var url = "/artists/"+this.props.artist.id + "?_method=PUT";
    var imgURL = this.props.artist.photo_url;
    console.log('in edit page');
    console.log(this.props);
    console.log(this.props.artist.name);

    return (
      <Template>
      <div>
      <h1>Edit this artist</h1>
      <form action={url} method="POST">
          <p>Name</p>
          <input name="name" value={this.props.artist.name}/><br/>
          <p>Photo Link</p>
          <input name="photo_url" value={this.props.artist.photo_url}/><br/>
          <p>Nationality</p>
          <input name="nationality" value={this.props.artist.nationality}/><br/>
          <input className="button" type="submit"/>
          <br/>
      </form>
      </div>
      </Template>
    );
  }
}

module.exports = EditArtist;

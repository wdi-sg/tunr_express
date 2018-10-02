var React = require("react");

class Edit extends React.Component {
  render() {

    let actionUrl = '/artists/'+this.props.id+'?_method=PUT';

    return (
      <html>
        <head />
        <body>
          <h1>EDIT ARTIST</h1>
          <form method="POST" action={actionUrl}>
            <p>Artist name</p>
            <input name="name" value={this.props.name}/>
            <p>Nationality</p>
            <input name="nationality" value={this.props.nationality}/>
            <p>Image link</p>
            <input name="photo_url" value={this.props.photo_url}/>
            <input name="id" value={this.props.id} type="hidden"/>
            <p></p>
            <input type='submit' value="Edit"/>
          </form>
          <p></p>
          <form method="GET" action="/artists">
            <input type='submit' value="Back"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;

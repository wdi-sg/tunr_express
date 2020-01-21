var React = require("react");

class Delete extends React.Component {
  render() {
    const id = this.props.id
    const actionURL = "/artists/"+id+"?_method=delete"
    return (
      <html>
        <head />
        <body>
        <form action={actionURL} method="POST">
            <input type="text" readOnly name="name" defaultValue={this.props.artist.name}/>
            <input type="text" readOnly name="photo_url" defaultValue={this.props.artist.photo_url}/>
            <input type="text" readOnly name="nationality" defaultValue={this.props.artist.nationality}/>
            <input type="submit" defaultValue="Delete!"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;

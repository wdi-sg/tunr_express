var React = require("react");

class Edit extends React.Component {
  render() {
    const id = this.props.id
    const actionURL = "/artists/"+id+"?_method=put"
    return (
      <html>
        <head />
        <body>
        <form action={actionURL} method="POST">
            <input type="text" name="name" defaultValue={this.props.artist.name}/>
            <input type="text" name="photo_url" defaultValue={this.props.artist.photo_url}/>
            <input type="text" name="nationality" defaultValue={this.props.artist.nationality}/>
            <input type="submit" defaultValue="Edit!"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;

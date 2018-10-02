var React = require("react");

class Edit extends React.Component {
  render() {
    console.log("INSIDE REACT INDEX", this.props.artist);

    return (
      <html>
        <head />
        <body>
          <div>
            <h1>Edit Artist</h1>
            <form method = "POST" action = {`/artists/${this.props.artist[0].id}?_method=PUT`}>
                <input type = "text" name = "name" value = {this.props.artist[0].name} placeholder = "Artist Name"/>
                <input type = "text" name = "photo_url" value = {this.props.artist[0].photo_url} placeholder = "Image URL"/>
                <input type = "text" name  = "nationality" value = {this.props.artist[0].nationality} placeholder = "Artist Nationality"/>
                <input type="submit"/>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;

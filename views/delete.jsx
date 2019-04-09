var React = require("react");

class Delete extends React.Component {
  render() {

    let artist = this.props.artists[0];
    let valueAttribute = `/artists/${artist.id}?_method=DELETE`

    return (
      <html>
        <head />
        <body>
          <h3>Delete {artist.name}</h3>
            <form method="POST" action={valueAttribute}>
                <input type="submit" value="Delete"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
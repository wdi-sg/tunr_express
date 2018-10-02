var React = require("react");

class Delete extends React.Component {
  render() {
    console.log("INSIDE REACT INDEX", this.props.artist);

    return (
      <html>
        <head />
        <body>
          <div>
            <h1>Edit Artist</h1>
            <form method = "POST" action = {`/artists/${this.props.artist[0].id}?_method=DELETE`}>
              <p>Confirm delete {this.props.artist[0].name}?</p>
                <input type="submit"/>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;

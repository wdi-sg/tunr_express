var React = require("react");

class oneArtist extends React.Component {
  render() {
    let name = this.props.name;
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>The artist name is {name}</h1>
                <p>The number of page count is: {this.props.cookie}</p>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = oneArtist;
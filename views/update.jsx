var React = require("react");

class Update extends React.Component {
  render() {
    let {id, name, photo_url, nationality} = this.props;
    return (
      <html>
        <head>
        </head>
        <body>
          <h1>Update Artist!!</h1>
          <p>{name}</p>
          <p>{photo_url}</p>
          <p>{nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Update;

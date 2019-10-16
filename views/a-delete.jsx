let React = require('react');

class Delete extends React.Component {
  render() {
    return(
      <html>
        <body>
          <h1>Artist Deleted</h1>
          <p>Id: {this.props.id}</p>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
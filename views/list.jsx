var React = require("react");

class List extends React.Component {
  render() {
    // let songs = '/artists/' + this.props.id + '/songs';
    // let formEdit = '/artists/' + this.props.id + '/edit';
    // let formDelete = '/artists/' + this.props.id + '?_method=delete';
    return (
      <html>
        <head />
        <body>
            <h1>{this.props.name}</h1>
        </body>
      </html>
    );
  }
}

module.exports = List;
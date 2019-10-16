var React = require("react");

class ShowSongs extends React.Component {
  render() {
      const songs = this.props.result.map(element => {
          return  <li>{element.title}</li>
      });
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            </head>
        <body className="m-3">
          <h1>Songs by Artist</h1>
          <ul>
              {songs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = ShowSongs;

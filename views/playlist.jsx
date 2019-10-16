var React = require("react");

class Playlist extends React.Component {
  render() {
    let list = this.props.result.map(item => {
        return <li>
          <h3> <a href={"/playlist/" + item.id }>{item.name}</a> </h3>
        </li>;
      });
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>
          <h1>List of Playlists</h1>
          <ol>
              {list}
          </ol>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

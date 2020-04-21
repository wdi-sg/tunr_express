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
            <div className="container mt-4">
            <h1 className="text-center display-3">List of Playlists</h1>
            <div className="container text-center">
            <a className="btn btn-primary btn-lg text-light text-center " href="/playlists/new">Add a PlayList</a>
          <a className="btn btn-info btn-lg text-light text-center ml-5" href="/artists/">Back To Home</a>
            </div>

          <ol className="mt-3">
              {list}
          </ol>
            </div>
         
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

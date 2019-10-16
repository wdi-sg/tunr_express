var React = require("react");

class Home extends React.Component {
  render() {
    let list = this.props.result.map(item => {
      return <li className="list-group-item"> 
        <h3> <a href={"/artists/" + item.id }>{item.name}</a> </h3>
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
          <div className="container mt-5">
          <h1 className="text-center display-3 border-bottom">TunR 1.0</h1>
     <div className="container mt-3 text-center">
     <a className="btn btn-primary btn-lg btn text-light mb-5"
  href="/artists/new"
>
  Add a new artist
</a>
<a className="btn btn-info btn-lg btn text-light mb-5 ml-5"
  href="/playlists/new"
>
  Add a new Playlist
</a>
<a className="btn btn-secondary btn-lg btn text-light mb-5 ml-5"
  href="/playlist"
>
  See all Playlists
</a>
     </div>
          
<h2 className="display-4">Artists: </h2>
<ul className="list-group">{list}</ul>
          </div>
         
        </body>
      </html>
    );
  }
}

module.exports = Home;

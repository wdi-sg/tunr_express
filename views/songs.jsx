var React = require("react");

class Songs extends React.Component {
  render() {
    let list = this.props.result.map(item => {
      return (
        <li className="list-group-item">
          <h2> <a href={"songs/"+ item.id}>{item.title}</a></h2>
          <p>
            <strong>artist:</strong>
            {item.name}
          </p>
          <p>
            <strong>album:</strong>
            {item.album}
          </p>
          <form action="/songtofav" method="POST">
          <input type="hidden" name="songId" value={item.id}/>
          <button type="submit" className="btn btn-success">Add to Favorites</button>
          </form>
        </li>
      );
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
            <h3 className="display-4 text-center border-bottom">
              List of All Songs
            </h3>
            <div className="container text-center">
              <a
                href="/artists/"
                className="btn btn-primary btn-lg text-center"
              >
                Back
              </a>
            </div>

            <ul className="list-group mt-4">{list}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Songs;

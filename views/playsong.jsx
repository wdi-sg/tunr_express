const React = require("react");

class playsong extends React.Component {
  render() {
    console.log(this.props.id);
    const filePath = "/playlist/" + this.props.playlistId;
      
      return (
        <li>
          <a href={route}>{playlistId.id}</a>
        </li>
      );
    });

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-Equiv="X-UA-Compatible" content="ie=edge" />
          <title>Playlist Songs</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
            integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>
        </head>

        <body>
        <div
        style={{ margin: `20px`, display: `flex`, flexDirection: `column` }}
      >
        <h1>See songs in playlist {this.props.playlistId} </h1>
        <div style={{ marginBottom: `10px` }}></div>
        <form action={filePath} method="PUT">
          <ul> ID: {songs}</ul>
          </div>
         
        </body>
      </html>
    );
  }
}

module.exports = playsong;

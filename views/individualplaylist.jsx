var React = require("react");

class Playlist extends React.Component {
  render() {
   let list = this.props.result.map(item => {
       return(
           <li>{item.title}</li>
       )
   })
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
          <h1>List of Songs</h1>
          <a className="btn btn-primary btn-lg text-light " href={this.props.id + "/newsong"}>Add a New Song</a>
          <a className="btn btn-primary btn-lg text-light ml-5" href={this.props.result.id + "/songs"}>Songs</a>
        <ol>
            {list}
        </ol>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

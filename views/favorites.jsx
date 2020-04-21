var React = require("react");

class Playlist extends React.Component {
  render() {
   let list = this.props.result.map(item => {
       return(
           <li className="list-group-item">
               {item.title} By {item.name}
           </li>
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
            <div className="container mt-5">
            <h1 className="text-center display-4">Your Favorites</h1>
            <div className="container text-center">
            <a href="/favorites/new" className="btn btn-primary btn-lg">Add a song</a>
            <a href="/artists/" className="btn btn-info btn-lg ml-3">Back</a>
            </div>
          
          <ul className="list-group mt-5">
              {list}
          </ul>
            </div>
          
{/* 
          <a className="btn btn-primary btn-lg text-light " href={this.props.result.id + "/newsong"}>Add a New Song</a>
          <a className="btn btn-primary btn-lg text-light ml-5" href={this.props.result.id + "/songs"}>Songs</a> */}
        
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

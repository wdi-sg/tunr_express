var React = require("react");

class Playlist extends React.Component {
  render() {
    let playlistName = this.props.result[0].name
   let list = this.props.result.map(item => {
       return(
           <li className="list-group-item"> 
              <strong>Title:</strong>  {item.title} <br/><br/>
              <strong>Artist:</strong>  {item.name} <br/><br/>

               <strong>Album: </strong>{item.album} <br/>
               
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
            <h1 className="text-center display-4 border-bottom">List of Songs </h1>
            <div className="container text-center mt-3">
            <a className="btn btn-primary btn-lg text-light " href={this.props.id + "/newsong"}>Add a New Song</a>
          <a className="btn btn-primary btn-lg text-light ml-5" href="/playlist">Back to Playlists</a>
            </div>
      
        <ul className="list-group mt-4">
            {list}
        </ul>
            </div>
       
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

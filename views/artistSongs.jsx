var React = require("react");

class Home extends React.Component {
  render() {
  let list = this.props.result.map(item => {
    return(
        <li className="list-group-item"> 
          <p> <strong>Title:</strong> {item.title}  </p>
          <p></p>
          <p> <strong>Album:</strong> {item.album}  </p>
          <p></p>
          {/* <p><strong>Artwork: </strong></p>
          <img src={item.artwork} alt=""/> */}
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
            <div className="container mt-4">
            <h1 className="display-3 text-center border-bottom">Songs</h1>
            <div className="container mt-3 text-center">

            <a className="btn btn-primary btn-lg text-light text-center " href={"/artists/" + this.props.id + "/songs/new"}>Add New Song</a>
            <a className="btn btn-info btn-lg text-light text-center ml-4" href="/artists/">Back To Home</a>
            </div>
            

<ol className="form-group mt-3">
    {list}
</ol>
            </div>
         
          
        </body>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");

class playlistID extends React.Component {
  render() {
    //console.log(this.props)
    let playlist = this.props.rows.map ((element, index) => {
        return (
          <tr class="container">
            <th scope="col">
            <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" name="song" value={element.id} id={"customCheck"+element.id}/>
                  <label class="custom-control-label" for={"customCheck"+element.id}></label>
            </div>
            </th>
            <th scope="col">{element.id}</th>
            <th scope="col">{element.title}</th>
            <th scope="col">{element.album}</th>
            <th scope="col">
              <audio controls style={{height:"20px"}}>
                <source src={element.preview_link} type="audio/mp3"></source>
                Your browser does not support the audio element.
              </audio>
            </th>
          </tr>
          )
        })
    return (
      <html>
      <head>
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"/>
      </head>
        <body>
            <div class='container mt-5' style={{height:"400px"}}>
              <div class="d-flex justify-content-center mb-3 bg-dark rounded-lg " style={{color:"white"}}><h1><u>{this.props.playlist}</u></h1>
              </div>
              <div class="d-flex">
                <table class="table table-responsive table-sm table-dark rounded-lg" >
                  <thead>
                    <tr>
                      <th scope="col">☑️</th>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Album</th>
                      <th scope="col">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlist}
                  </tbody>
                </table>
              </div>
              <div class="d-flex">
                <form action="/playlist" method="get">
                  <input type="submit" class="btn btn-dark mr-3" value="Back"/>
                </form>
                <form action={"/playlist/"+this.props.id+"/newsong"} method="post">
                  <input type="submit" class="btn btn-dark" value="Add song to playlist"/>
                </form>
                <div class='ml-auto'>
                        views: <button class="btn btn-dark rounded-pill" style={{width:"60px"}}>{this.props.visits}</button>
                </div>
              </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = playlistID;
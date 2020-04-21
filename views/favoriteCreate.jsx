var React = require("react");

class playlistNew extends React.Component {
  render() {

    let playlist = this.props.rows.map ((element, index) => {
        return (
          <tr>
            <th>
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
            <div class='container' style={{height:"400px"}}>
              <br/>
              <form action="/addtofavorite" method="POST">
                <div class="input-group mb-3">
                    <input type="submit" class="btn btn-dark" value="Click to add these songs to my favorite playlist"/>
                </div>
                  <table class="table table-responsive table-sm table-dark rounded-lg" style={{height:"400px"}}>
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
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = playlistNew;
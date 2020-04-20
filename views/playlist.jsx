var React = require("react");

class playlist extends React.Component {
  render() {
    //console.log(this.props.rows)
    let playlist = this.props.rows.map ((element) => {
        return (
            <div>
                <form method="post" action={"/playlist/"+element.id}>
                    <input type="submit" name="name" class="btn btn-block btn-dark" style={{margin:"0.5px 0"}} value={element.name}/>
                </form>
            </div>
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
            <div class='container mt-5'>
                <form method="get" action="/playlist/new">
                    <button type="submit" class="btn btn-dark">Create Playlist</button>
                </form>
                ~~~Playlist Overhere~~~
                <div class="nav flex-column">
                    {playlist}
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = playlist;
var React = require("react");

class playlist extends React.Component {
  render() {
    //console.log(this.props.rows)
    let playlist = this.props.rows.map ((element) => {
        return (
            <div>
                <form method="get" action={"/playlist/"+element.id}>
                    <input type="submit" class="btn btn-block btn-dark" style={{margin:"0.5px 0"}} value={element.name}/>
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
            <div class='container'>
                <div class='d-flex mb-5 mt-3'><h2><u>Welcome, {this.props.username}</u></h2>
                    <div class='ml-auto'>
                    <form method="post" action="/logout?_method=delete">
                        <button class="btn btn-dark rounded-pill" style={{width:"100px"}}>Log out</button>

                        </form>
                    </div>
                </div>
                <div class='d-flex'>
                    <div>
                        <form method="get" action="/playlist/new">
                            <button type="submit" class="btn btn-dark">Create Playlist</button>
                        </form>
                    </div>
                    <div class="ml-2">
                        <form method="get" action="/favorites/new">
                            <button type="submit" class="btn btn-dark">Create Favorite Playlist</button>
                        </form>
                    </div>
                    <form method="post" action="/logout?_method=delete">
                    </form>
                    <div class='ml-auto'>
                        views: <button class="btn btn-dark rounded-pill" style={{width:"60px"}}>{this.props.visits}</button>
                    </div>
                </div>
                ~~~Playlist Overhere~~~
                <div class="nav flex-column">
                    <div>
                        <form method="get" action="/favorites">
                            <input type="submit" class="btn btn-block btn-dark" style={{margin:"0.5px 0"}} value="Favorite Playlist"/>
                        </form>
                    </div>
                    {playlist}
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = playlist;
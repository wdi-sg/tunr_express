var React = require("react");

class Head extends React.Component{
    render(){
        return(
            <head>
                <meta charSet="utf-8"/>
                <title>TUNR EXPRESS: Favourite Some Songs</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/style.css"/>
            </head>
        )
    }
}

class Navigation extends React.Component{
    render(){
        return(
            <nav>
                <ul class="nav flex-column">
                    <li class="nav-item">
                    <a method="GET" href="/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Return to view all artist</a>
                    </li>
                    <li class="nav-item">
                        <a method="GET" href="/new"><span class=" glyphicon glyphicon-plus" aria-hidden="true"></span>Add New Artist to List</a>
                    </li>
                    <li class="nav-item">
                        <a method="GET" href="/playlist"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>View Playlist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class Songs extends React.Component {
  render() {

    // console.log(this.props.data);
    let songElements = this.props.data.map((o) => {
        return <li><label><input type="checkbox" name="songs" value={ o.id }/> { o.title }, { o.album }</label></li>
    });


    return (
        <ul>
            {songElements}
        </ul>
    );
  }
}

class FavouriteForm extends React.Component{
    render(){

            let formAction = '/favourites';
            const userId = this.props.data.cookies.userId

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                           <input type="text" name="userId" class="form-control invisible" value={userId} />
                            Songs: <Songs data={this.props.data.dataSongs}/><br/>
                        </div>
                    </div>
                    <input type="submit" value="Favourite Selected Songs"  class="btn btn-primary"/>
                </form>
            </html>
        )
    }
}

class NewFavForm extends React.Component {
  render() {

    const data = this.props.data

    return (
      <html>
        <Head/>
        <body>
            <Navigation/>

          <h1>Mildly Comparable Audiophalse</h1>
          <br></br>
          <h3>Choose Songs to Favourite</h3>
          <div class="content">
          <FavouriteForm data={data}/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewFavForm;
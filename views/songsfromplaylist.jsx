var React = require("react");

class Head extends React.Component{
    render(){
        return(
            <head>
                <meta charSet="utf-8"/>
                <title>TUNR EXPRESS</title>
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
                    <a method="GET" href="/playlist"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Return to view all playlist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class AddNewSong extends React.Component{
    render(){
        let data = this.props.data;
        let formAction = `/playlist/${data}`

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label >Song Id: </label>
                            <input type="text" name="id" class="form-control" placeholder="Add Song Id" required/>
                        </div>
                    </div>
                    <input type="submit" value="Add Song To Playlist"  class="btn btn-primary"/>
                </form>
            </html>
        );
    }
}

class ViewSongsPlayList extends React.Component {
  render() {

    let data = this.props.data
    console.log('fuck!!1');
    console.log(data);
    let outList;
    let playListId= data[1];
    console.log('palylist id');
    console.log(playListId);
    console.log(data[0].length);
    if(data[0].length == 0){
        outList = data[0].map((item,index)=>{
        return  <div class="card-item">
                    <a href={`${item.preview_link}`}>
                    <h4>{index}. {item.album}</h4><h4>{item.title}</h4>
                    </a>
                </div>
        })
        } else {
        outList = data[0].map((item,index)=>{
        return  <div class="card-item">
                    <a href={`${item.preview_link}`}>
                    <h4>{index}. {item.album}</h4><h4>{item.title}</h4>
                    </a>
                </div>
        })
    }
    return (
      <html>
        <Head/>
        <body>
            <Navigation/>
          <h1>Mildly Comparable Audiophalse (Song List)</h1>
          <AddNewSong data={playListId}/>
          <div class="content">
            {outList}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ViewSongsPlayList;
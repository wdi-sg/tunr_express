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
                        <a method="GET" href="/new"><span class=" glyphicon glyphicon-plus" aria-hidden="true"></span>Add New Artist to List</a>
                    </li>
                    <li class="nav-item">
                    <a method="GET" href="/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Return to view all artist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class AddEdit extends React.Component {
  render() {

    let data = this.props.data[0]

    return (
      <html>
        <Head/>
        <body>
            <Navigation/>
          <h1>Mildly Comparable Audiophalse (Song List)</h1>
          <div class="content">
            <div class="card-item">
                    <img src={data.photo_url}/>
                    <a class="card-body" href={`/artist/${data.id}`}>
                    <h4>{data.id}. {data.name}</h4>
                    <h5>{data.nationality}</h5>
                    </a>
                    <a href={`/artist/${data.id}/edit`}>Edit</a>
                </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = AddEdit;
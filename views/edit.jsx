var React = require("react");

class Edit extends React.Component {
  render() {

        var url = "/artists/"+this.props.artists.id + "?_method=PUT";
    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/new.css"/>
        </head>
        <body>
          <h3>Edit an artist</h3>
          <div className="wrapper_new">
                <form action={url} method="POST">
                    <p>Name: </p><input type="text" className="input-field" name="name" defaultValue={this.props.artists.name}/>
                    <p>Image: </p><input className="input-field" name="photo_url" defaultValue={this.props.artists.photo_url}/>
                    <p>Nationality: </p><input className="input-field" name="nationality" defaultValue={this.props.artists.nationality}/>
                    <p><input type="submit" value="Submit"/></p>
                </form>
            </div>


        </body>
      </html>
    );
  }
}

module.exports = Edit;

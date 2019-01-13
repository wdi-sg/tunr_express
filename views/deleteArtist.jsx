var React = require('react');

// page that confirms the deletion of recipe
class DeleteArtist extends React.Component {

  render() {
    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>
        <h1>Artist Delete Confirmation </h1>
            <h2>Artist ID: {this.props.id}</h2> <br/>
            <h2>Artist Name: {this.props.name}</h2> <br/>
            <h2>Photo URL: {this.props.photo_url}</h2><br/>
            <h2>Nationality: {this.props.nationality}</h2><br/><br/>

                <form method="POST" action={"/Artist/" + this.props.id + "?_method=DELETE"}>
                    <input type="submit" value="Delete artist"/>
                </form>
      </div>
      </body>
      </html>
    );
  }
}
module.exports = DeleteArtist;

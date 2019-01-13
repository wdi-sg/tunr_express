var React = require('react');
//// page that confirms the editing of recipe

class EditArtist extends React.Component {

  render() {
    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>
        <h1>Edit Artist{ this.props.id }</h1>
        <form method="POST" action={"/artists/"+this.props.id+"?_method=PUT"}>
            <input name = "id" value={this.props.id} placeholder="ID"/><br />
            <input name = "name" placeholder="Artist Name"/> <br/>
            <input name = "photo_url" placeholder="Photo URL "/> <br/>
            <input name = "nationality" placeholder="Nationality"/> <br/><br/>
            <input type = "submit" value="Confirm"/>
        </form>

      </div>
      </body>
      </html>
    );
  }
}
module.exports = EditArtist;
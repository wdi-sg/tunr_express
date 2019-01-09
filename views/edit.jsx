var React = require('react');
class EditRecipe extends React.Component {

  render() {


    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>
        <h1>Edit { this.props.artists.name }</h1>
        <form method="POST" action={"/artists/"+ this.props.artists.id +"?_method=PUT"}>
        <input name = "name" placeholder="Name"/><br />
        <input name = "photo_url" placeholder="Photo URL"/> <br/>
        <input name = "nationality" placeholder="Nationality"/> <br/><br/>
        <input type = "submit" />
        </form>

      </div>
      </body>
      </html>
    );
  }
}
module.exports = EditRecipe;

var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <body>
        <div>
        <h1>Details of {this.props.name}</h1>
        <form action={"/artist/" + this.props.id+'?_method=put'} method="POST">
        <p>Name :</p><input type="text" name="name" value={this.props.name} required/><br/>
        <p>Photo_url :</p><input type= "text" name="photo_url" value={this.props.photo_url} required/><br/>
        <p>Nationality :</p><input type="text" name="nationality" value={this.props.nationality} required/><br/>
        <br/><input type="submit" value="Submit"/>
        </form>
        </div>
        </body>
      </html>
    )
  }
}

module.exports = Edit;
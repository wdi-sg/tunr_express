var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Edit Artist!</h3>
                <form method="POST" action={"/artists/"+ this.props.id + "?_method=PUT"}>
                <p>ID: </p>
                <input name="id" defaultValue ={this.props.id}/><br/>
                <p>Name: </p>
                <input name="name" defaultValue ={this.props.name}/><br/>
                <p>Photo_URL: </p>
                <input name="photo" defaultValue ={this.props.photo}/><br/>
                <p> Nationality: </p>
                <input name="nationality" defaultValue ={this.props.nationality}/><br/>
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Edit;
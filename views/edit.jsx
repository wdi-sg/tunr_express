var React = require("react");

class Edit extends React.Component {
  render() {
    let formAction = '/artists/' + this.props.id + '?_method=put';
    return (
      <html>
        <head />
        <body>
            <h3>Edit Artist</h3>
            <form method="POST" action={formAction}>
                Name: <input type="text" name="name" defaultValue={this.props.name} required/><br/>
                Photo URL: <input type="url" name="photo_url" defaultValue={this.props.photo_url} required/><br/>
                Nationality: <input type="text" name="nationality" defaultValue={this.props.nationality} required/><br/>
                <input type="submit" value="Submit"/>
            </form>
            <p>
                Click here to go back: <br/>
                <input type="submit" value="Back"/>
            </p>
        </body>
      </html>
    );
  }
}

module.exports = Edit;

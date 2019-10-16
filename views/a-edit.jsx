let React = require('react');

class Edit extends React.Component {
  render() {
    console.log("this is edit" + this.props.rows.name)
    let put = '/artists/' + this.props.id + '?_method=put';
    return(
      <html>
        <body>
          <h1>Edit: {this.props.rows.name}</h1>
          <form action={put} method="POST">
            <p>Name</p>
            <input type="text" name="name" defaultValue={this.props.rows.name}/><br/><br/>
            <p>Photo URL</p>
            <input type="text" name="photo_url" defaultValue={this.props.rows.photo_url}/><br/><br/>
            <p>Nationality</p>
            <input type="text" name="nationality" defaultValue={this.props.rows.nationality}/><br/><br/>
            <input type="submit" value="Edit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
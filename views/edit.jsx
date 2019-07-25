var React = require('react');

class Edit extends React.Component {
  render() {
    console.log('form');
    console.log(this.props);
    var url = "/artist/" +this.props.artistId + "/edit?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit info for {this.props.artistName}</h1>
            <form action={url} method="POST">
                 <input type="hidden" name="id" value={this.props.artistId}/>
                Url of photo: <input type="text" name="photo_url" value={this.props.artistImg}/><br/>
                Nationality: <input type="text" name="nationality" value={this.props.artistNat}/><br/>
                <input type="submit" value="Submit"/>
                </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
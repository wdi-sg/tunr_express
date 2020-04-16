var React = require('react');
class Edit extends React.Component {
  render() {
    let currentId = this.props.artist.id;
    let putLink = "/artists/" + currentId + "?_method=put";
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Edit Artist</h1>
          </div>
          <div>
            <form method="POST" action={putLink}>
              <div>
                Name:
                <input type="text" name="name" value={this.props.artist[0].name}></input>
                </div>
              <div>
                Photo URL:
                <input type="text" name="photourl" value={this.props.artist[0].photo_url}></input>
              </div>
              <div>
                Nationality:
                <input type="text" name="nationality" value={this.props.artist[0].nationality}></input>
              </div>
              <div>
                <input type="submit" value="submit"></input>
              </div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
var React = require("react");

class Artist extends React.Component {
  render() {

    let {id, name, photo_url, nationality} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>Artist</h2>
        <h3>{name}</h3>
        <img src={photo_url} alt = {name} height = '300' width = '300'/>
        <h3>{nationality}</h3>

          <div>
            <form method = 'POST' action = {`/artists/${id}?_method=delete`}>
              <input type = "submit" value = "Delete"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = Artist;

var React = require("react");

class Song extends React.Component {
  render() {

    let {id, title, album, preview_link, artwork} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>Song</h2>
        <h3>{title}</h3>
        <h3>{album}</h3>
        <h3>{preview_link}</h3>
        <h3>{artwork}</h3>

          <div>
            <form method = 'POST' action = {`/songs/${id}?_method=delete`}>
              <input type = "submit" value = "Delete"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = Song;

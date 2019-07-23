var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <h1>Add New Artist to Our Current Artists!</h1>t
              <form method="POST" action="/artist">
                <p>Artist Name: </p>
                <input className="artist-name" type="text" name="name" placeholder="enter artist name" />

                 <p>Artist Photo: </p>
                <input className="artist-pho
                to" type="text" name="photo_url" placeholder="enter artist photo url" />

                <p>Artist Nationality: </p>
                <input className="artist-nationality" type="text" name="nationality" placeholder="enter artist nationality" />

                <input className="submit-btn" type="submit" value="Add" />
              </form>

        </body>
      </html>
    );
  }
}

module.exports = New;
var React = require("react");

//new artist form page to include dropdown for nationality
console.log("New Artist Form Page Accessed");
console.log("------------------");

class NewArtist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>New Artist</h1>
          <div>
            <form action="/artists" method="POST">
              <p>
                Name <input name="name" />
              </p>
              <p>
                Photo <input name="photo_url" />
              </p>
              <p>
                Nationality <input name="nationality" />
              </p>
              <p>
                <input type="submit" />
              </p>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewArtist;

const React = require('react');

class ArtistForm extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet"
                href="/pub/css/bootstrap.min.css"
          />
        </head>

        <body>
          <div className="container">
            <form action="/artists/new" method="post">
              <input name="name" placeholder="Artist Name" /><br />
              <input name="photo_url" placeholder="Photo URL" /><br />
              <input name="nationality" placeholder="Country" /><br />
              <input type="submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistForm;

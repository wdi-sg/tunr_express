const React = require('react');
const Head = require('./head');

class ArtistForm extends React.Component {
  render() {
    return (
      <html>
        {Head}

        <body>
          <div className="container">
            <form action="/artists/new" method="post">
              <div class="form-group">
                <input name="name" placeholder="Artist Name" /><br />
                <input name="photo_url" placeholder="Photo URL" /><br />
                <input name="nationality" placeholder="Country" /><br />
                <input type="submit" />
              </div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistForm;

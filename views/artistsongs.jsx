const React = require('react');
const Head = require('./head');

class ArtistSongs extends React.Component {
  render() {
    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col">

                A LIST OF THEIR SONGS

              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;

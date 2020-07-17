var React = require('react');

class addArtists extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Adding new artist</h1>
            <form action="/artists" method="POST">
                Enter Artist Information Here:
                <br></br>
                <input type="text" name="name" placeholder="name"/>
                <br></br>
                <input type="text" name="photo_url" placeholder="photo url"/>
                <br></br>
                <input type="text" name="nationality" placeholder="nationality"/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = addArtists;
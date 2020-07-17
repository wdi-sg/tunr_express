var React = require('react');

class eachArtist extends React.Component {

  render() {
    console.log("EACH ARTIST LOGGGGGGGG:",  this.props.searched[0].id);
    let profile = this.props.searched[0];
    
    return (
      <html>
        <body>
          <div>
            <div><b>ID: </b><a>{profile.id}</a></div>
            <div><b>Name: </b><a>{profile.name}</a></div>
            <div><b>Photo URL: </b><a>{profile.photo_url}</a></div>
            <div><b>Nationality: </b><a>{profile.nationality}</a></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = eachArtist;
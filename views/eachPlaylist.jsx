var React = require('react');

class eachPlaylist extends React.Component {



  render() {
    console.log("EACH PLAYLIST LOGGGGGGGG:",  this.props.searched);
    let profile = this.props.searched[0];
    
    return (
      <html>
        <body>
          <div>
            <div><b>ID: </b><a>{profile.id}</a></div>
            <div><b>Name: </b><a>{profile.name}</a></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = eachPlaylist;
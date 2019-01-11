var React = require("react");

class Home extends React.Component {
  render() {
    const List = this.props.artist.map(ele => {
      return ( <p> ID: { ele.id } NAME: { ele.name } ALBUM: { ele.album } TITLE: { ele.title } </p> )
    });
    return (
      <html>
        <body>
          <h1>Welcome!</h1>
          <a href="/artist/songs/new"><button>CREATE NEW</button></a>
          <div>
          { List }
          </div>
          
        </body>
      </html>
    );
  }
}

module.exports = Home;

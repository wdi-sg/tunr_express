var React = require("react");

class Home extends React.Component {
  render() {
        let allArtists = this.props.rows
        let artistHTML = allArtists.map((item)=>{
            let artistURL = "/artists/" + item.id
            return <a href={artistURL}><li>{item.name}</li></a>
        })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <ul>
          {artistHTML}
          </ul>

          <br/><br/>
          <a href="/artists/new"><button>Add a new artist</button></a>
        </body>
      </html>
    );
  }
}

module.exports = Home;
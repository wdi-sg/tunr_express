// var Reuse = require('./reuse'); <Reuse />
var React = require("react")
var DefaultLayout = require('./layout/default')

class Home extends React.Component {
  render() {

    const artistElemenents = this.props.artists.map((artist) => {

        let linkPath = "/artist/"+ artist.id;

        return (<li><a href={linkPath}>{artist.name}</a></li>)
    });

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
        </body>
      </html>

    <DefaultLayout title= 'New Task'>

    <h1>All Artists</h1>
        <ul>
        {artistElemenents}
        </ul>

        <button><a href="/new">Add a new artist pg</a></button>

    </DefaultLayout>

    );
  }
}

module.exports = Home;
var React = require("react");

class Artisthome extends React.Component {
  render() {

    console.log("THIS PROPS:", this.props);
    let artistList = this.props.artists.map(item => {
        return <li class={item.id}><a href="/">{item.name}</a></li>;
    })

    return (
      <html>
        <head />
        <body>
          <h1>Artists</h1>
          <ul>
            {artistList}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Artisthome;

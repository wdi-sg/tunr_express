var React = require("react");

class Songs extends React.Component {
  render() {
  let song = this.props.songs.map(item=>{
    console.log("item"+item);
    return (
      <div>
        <tr>
        <td>{item.album}</td>
        </tr>
      </div>
    );
  })

    return (

      <html>
        <head />

        <body>

          <h1>{song}</h1>
        </body>

      </html>
    );
  }
}

module.exports = Songs;
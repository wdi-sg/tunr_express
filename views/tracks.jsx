var React = require("react");

class Tracks extends React.Component {
  render() {
        const trackElements = this.props.tracks.map((track) => {
            return <table>
            <tr>
                <td>{track.title}</td>
                <td>/{track.album}/</td>
                <td>--{track.name}</td>
              </tr>
              </table>

      })

    return (
      <html>
        <head />
        <body>

            <p>
              {trackElements}

            </p>
        </body>
      </html>
    );
  }
}

module.exports = Tracks;

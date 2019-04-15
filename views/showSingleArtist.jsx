var React = require("react");

    class showSingleArtist extends React.Component {
      render() {
        const list = this.props.artist.map(item => {
          return (
            <div>
            <li>{item.id}. {item.name} ({item.nationality})</li>
            <li><img width="400px" src={item.photo_url} alt="photo of artist"/></li>
            </div>
          );
        });

        return (
          <html>
            <head />
            <body>
              <h1>Artist</h1>
              {list}
            </body>
          </html>
        );
      }
    }

    module.exports = showSingleArtist;
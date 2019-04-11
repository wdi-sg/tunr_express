var React = require("react");

    class Index extends React.Component {
      render() {

        const themArtist_data = this.props.artist_data.map((artist_data) => {
            return <li>{artist_data.name}</li>;
        });

        return (
          <html>
            <head />
            <body>
              <h1>Tuner Artist:</h1>
                <h1>{themArtist_data}</h1>
            </body>
          </html>
        );
      }
    }

    module.exports = Index;
var React = require("react");

class Allartists extends React.Component {
  render() {
    // CSS stuff
    const artistImageStyle = {
                                "max-width" : "300px",
                                "max-height" : "300px"
                              };

    const artistLayout = {
                          "display" : "flex",
                          "flex-wrap" : "wrap",
                          "justify-content" : "space-between"
                        }

    const background = {
                        "background" : "rgb(225, 173, 1)"
                      }

    const title = {
                    "text-align" : "center"
                  }

    // Javascript stuff
    const allArtists = this.props.result.map(el => {
      return (
          <div>
            <img src={el.photo_url} style={artistImageStyle}></img>
            <p>{el.name}</p>
          </div>
        )
    })

    return (
      <html>
        <head />
        <body style={background}>
          <h1 style={title}>All Artists</h1>
          <div style={artistLayout}>
            {allArtists}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Allartists;
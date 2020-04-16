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

    const heading = {
                      "display" : "flex",
                      "justify-content" : "center"
                    }

    const title = {

                  }

    const newArtistStyle = {
                            "position" : "absolute",
                            "right" : "2%",
                            "top" : "4%",
                            "font-size" : "25px",
                            "text-decoration" : "none",
                            "color" : "black",
                            "padding" : "3px",
                            "border" : "2px solid black"
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

    const newArtist = <a href="/artists/new" style={newArtistStyle}>Add New Artist</a>

    return (
      <html>
        <head />
        <body style={background}>
          <div style={heading}>
            <h1 style={title}>All Artists</h1>
            {newArtist}
          </div>
          <div style={artistLayout}>
            {allArtists}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Allartists;
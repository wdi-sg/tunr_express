var React = require("react");

class addSongToArtist extends React.Component {
  render() {

    let url = "/artist/"+this.props.id+'/songs';
    return (
      <html>
        <head/>
        <body>
          <h3>Create new Song</h3>
            <form action= {url} method="POST">
                <p>
                    Title<input name="title" type ="text"/>
                </p>
                <p>
                    Album<input name="album" type ="text"/>
                </p>
                <p>
                    Preview Link<input name="preview_link" type ="text"/>
                </p>
                <p>
                    Artwork<input name="artwork" type ="text"/>
                </p>


                <button type = "submit">Submit</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = addSongToArtist;
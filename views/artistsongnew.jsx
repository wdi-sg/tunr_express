var React = require("react");

class artistSongNew extends React.Component {
  render() {

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                </head>
                <body>
                    <h1>Create a new artist</h1>
                    <form method="POST" action="/artist/:id/songs">
                        Title <input type="text" name="title"/><br/>
                        Album <input type="text" name="album"/><br/>
                        Preview Link <input type="text" name="preview_link"/><br/>
                        Song Artwork <input type="text" name="artwork"/><br/>
                        Artist_id <input type="text" name="artist_id" value={this.props.data[0]}/>
                        <input type="submit" value="Submit"/><br/>
                    </form>
                </body>
            </html>
        );
    }
}


module.exports = artistSongNew;
var React = require('react');

class Newsong extends React.Component {
    render() {
        let newSongPath = `/artists/${this.props.artistId}/songs`

        return(
            <html>
            <body>
                <form method="POST" action={newSongPath}>
                  <h3>Add more songs🎤</h3>
                    TITLE: <input type="text" name="title"/>
                    <br/>
                    ALBUM: <input type="text" name="album"/>
                    <br/>
                    LINK: <input type="text" name="preview_link"/>
                    <br/>
                    ARTWORK: <input type="text" name="artwork"/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </body>
            </html>
            )
    }
}


module.exports = Newsong;
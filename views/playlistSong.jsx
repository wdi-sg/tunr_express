const React = require('react');

class PlaylistSong extends React.Component {
    render() {

        return(
            <html>
             <body>
                <div>
                    <h1>Add song to Playlist!</h1>



                    <form action={'/playlist/'+this.props.id} method="POST">
                    <p>song_id: </p><input type = "number" name="song_id" required/><br/>
                     </form>
                </div>
             </body>
            </html>
            )}
    }



module.exports = PlaylistSong;
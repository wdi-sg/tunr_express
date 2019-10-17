var React = require('react');

class Favorites extends React.Component {
    render() {

        let showSongs= this.props.songsList.map((song) => {
            return (
                <div>
                       <h3> {song.id}. {song.title}</h3>
                 </div>
            );
        });

        return (
            <html>
                <head />
                <body>
                    <h3>Your favorite songs:</h3>

                    <form method="POST" action={'/favorites/new' + this.props.id}>
                       <input type="text" name="id" />
                        <input type="submit" value="Submit" />
                    </form>

                     {showSongs}
                </body>
            </html>
        );
    }
};

module.exports = Favorites;

//check app.post,favorites first how to work with cookies, then got back here for edits for the song data

//what is about submit that doesn't work?
var React = require('react');

class FavoritesNew extends React.Component {
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
                    <h3>Add Favorite Songs:</h3>

                    <form method="POST" action={'/favorites/' + this.props.id}>
                       <input type="text" name="id" />
                        <input type="submit" value="Submit" />
                    </form>
                    {showSongs}
                </body>
            </html>
        );
    }
};

module.exports = FavoritesNew;
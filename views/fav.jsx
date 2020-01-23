var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Fav extends React.Component {
    render() {
        let selectEle = this.props.songs.map ( song => {
            return (<option value={song.id}>{song.title}</option>);
        })
        let songEle = this.props.fSongs.map( fSong => {
            let hrefStr = "/songs/"+fSong.id;
            return (<div><a href={hrefStr}>{fSong.title}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>List of Songs In Favorites</h3>
                        {songEle}
                        <form action="/favs" method="POST">
                            <select name="song_id">
                                {selectEle}
                            </select>
                            <input type="submit"/>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Fav;
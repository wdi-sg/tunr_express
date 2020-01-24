var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class PlayAdd extends React.Component {
    render() {
        let actionStr = "/playlists/"+this.props.playId
        let selectEle = this.props.songs.map ( song => {
            return (<option value={song.id}>{song.title}</option>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>List of Songs to Add</h3>
                        <form action= {actionStr} method="POST">
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

module.exports = PlayAdd;
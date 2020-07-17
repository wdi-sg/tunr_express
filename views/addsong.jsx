
const React = require("react");
const Layout = require('./layout');

class Playlistsong extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action={"/playlists/"+ this.props.playlist}>
                    <div className="form-group">
                        <label>Playlist number: </label>
                        <input className="form-control form-control-lg" type="text" value = {this.props.playlist} name="playlistid" readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Add song to playlist:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. BEST SONG" name="name" required/>
                        <select name = "songs">
                        </select>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Playlistsong
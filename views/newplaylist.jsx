
const React = require("react");
const Layout = require('./layout');

class Newplaylist extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action="/playlists">
                    <div className="form-group">
                        <label>New Playlist Name</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. MOST AMAZING PLAYLIST" name="name" required/>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Newplaylist
var React = require("react");

var Layout = require("./layout");

class NewPlaylist extends React.Component {
    render() {
        return (
    <Layout>
            <div className="container">
            <h1>Add Playlist</h1>

                <form method="POST" action="/playlists">

                <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name"/>
                </div>

                <button type="submit" className="btn btn-danger btn-customized">Create</button>

                <a href="/playlists/" className="btn btn-primary ml-4">Back</a>

                </form>
            </div>
    </Layout>
);
    }
}

module.exports = NewPlaylist;
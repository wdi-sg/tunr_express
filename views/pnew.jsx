const React = require("react");
const Layout = require('./layout');

class New extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action="/playlists">
                    <div className="form-group">
                        <label>Playlist Name</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. Acoustic Death Metal Chillout Songs" name="name" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = New;
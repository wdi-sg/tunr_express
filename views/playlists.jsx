var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Playlists extends React.Component {
    render() {
        let index = 0;
        let playEle = this.props.playlists.map ( playlist => {
            index++
            let hrefStr = "/playlists/"+playlist.id;
            return (<div><a href={hrefStr}>{index}. {playlist.name}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h2>Playlists</h2>
                        <form action="/playlists" method="POST">
                            <div className="form-group col-4">
                                <label>Name :</label>
                                <input type="text" className="form-control" placeholder="Name of Playlist" name="name"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add New Playlist</button>
                        </form>
                        {playEle}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Playlists;
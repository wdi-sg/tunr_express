var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Playlist extends React.Component {
    render() {
        let songEle = this.props.playlists.map ( song => {
            let hrefStr = "/songs/"+song.id;
            return (<div><a href={hrefStr}>{song.title}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>{this.props.name}</h3>
                        {songEle}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Playlist;
var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Songs extends React.Component {
    render() {
        let songEle = this.props.songs.map ( song => {
            let hrefStr = "/songs/"+song.id;
            return (<div><a href={hrefStr}>{song.title}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>List of Songs</h3>
                        {songEle}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Songs;
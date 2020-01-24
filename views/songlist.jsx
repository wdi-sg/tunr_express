var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Songlist extends React.Component {
    render() {
        let ahref = "/artists/"+this.props.id
        let songEle = this.props.songs.map ( song => {
            let hrefStr = "/artists/"+this.props.id+"/songs/"+song.id;
            return (<div><a href={hrefStr}>{song.title}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>List of Songs by <a href={ahref}>{this.props.artist}</a></h3>
                        {songEle}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Songlist;
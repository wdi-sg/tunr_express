var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Song extends React.Component {
    render() {
        let href="/artists/"+this.props.id+"/songs";
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h1>Song Details!</h2>
                        <h2>Title : {this.props.title}</h2>
                        <h3>Album : {this.props.album}</h3>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Song;
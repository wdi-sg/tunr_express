var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Alist extends React.Component {
    render() {
        let artistEle = this.props.artists.map( artist => {
            let hrefStr = "/artists/"+artist.id;
            return (<div><a href={hrefStr}>{artist.name}</a></div>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>List of Artists</h3>
                        {artistEle}
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Alist;
var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Artists extends React.Component {
    render() {
        let href="/artists/"+this.props.id+"/songs";
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h1>Welcome to Tunr Databass!</h1>
                        <h2>Name : {this.props.name}</h2>
                        <img className="img-fluid"src={this.props.photo_url}/>
                        <h2>Nationality : {this.props.nationality}</h2>
                        <p><a href={href}>View Songs by Artist</a></p>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Artists;
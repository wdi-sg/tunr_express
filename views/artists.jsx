var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Artists extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h1>Welcome to Tunr Databass!</h1>
                        <h2>Name : {this.props.name}</h2>
                        <img src={this.props.photo_url}/>
                        <h2>Nationality : {this.props.nationality}</h2>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Artists;
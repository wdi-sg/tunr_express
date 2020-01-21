var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Artists extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Navbar />
                    <h1>Welcome to Tunr Databass!</h1>
                </body>
            </html>
        );
    }
}

module.exports = Artists;
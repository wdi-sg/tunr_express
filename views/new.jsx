var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")

class New extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Navbar />
                    <h3>Form Goes Here!</h3>
                </body>
            </html>
        );
    }
}

module.exports = New;

const React = require("react");
const Footer = require("./footer");

class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Tunr</title>
                    <link rel="stylesheet" href="/style.css"/>
                    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700&display=swap" rel="stylesheet" />
                </head>
                <body>
                    <div class="container">
                        {this.props.children}
                    </div>
                    <div class="container">
                        <Footer />
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = Layout;
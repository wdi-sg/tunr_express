var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
        <html>
                <head>
                        <title>{this.props.title}</title>
                        <link rel="stylesheet" type="text/css" href="/style.css"></link>

                </head>
                <body>

                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;
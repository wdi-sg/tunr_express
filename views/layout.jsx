var React = require('react');

class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>

                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                    <link rel="stylesheet" href="/style.css"></link>

                </head>

                <body>
{/*                    <div class="main-container">*/}
                        {this.props.children}
{/*                    </div>*/}


                </body>
            </html>
        ) // end of return
    }  // end of rendering
}  // end of layout

module.exports = Layout;
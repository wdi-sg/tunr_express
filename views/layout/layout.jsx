var React = require('react');

class Layout extends React.Component {

  render () {

    return (

      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa|Roboto" rel="stylesheet" />
          <link rel="stylesheet" href="/style.css" />
        </head>
        <div class="container">
          <body>
            {this.props.children}
          </body>
          <footer><a href="/artists/">Back to Index</a></footer>
        </div>
      </html>

    )
  }
}

module.exports = Layout;

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
          <header><h1>Hello</h1></header>
          <body>
            {this.props.children}
          </body>
        </div>
      </html>

    )
  }
}

module.exports = Layout;

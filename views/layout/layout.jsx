var React = require('react');

class Layout extends React.Component {

  render () {

    return (

      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa|Roboto" rel="stylesheet" />
          <link rel="stylesheet" href="/reset.css" />
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          {this.props.children}    
        </body>
      </html>

    )
  }
}

module.exports = Layout;

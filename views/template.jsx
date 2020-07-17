var React = require('react');


class Template extends React.Component {
  render() {
    var logo = '/logo.png';
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
          <header>
            <div>
              <a href="/artists">
              <h1>TUNR EXPRESS</h1>
              </a>
            </div>
          </header>
            {/*THIS IS THE IMPORTANT PART*/}
              {this.props.children}
            <footer>
              <div>
                <p>This is footer</p>
              </div>
            </footer>
        </body>
      </html>
    );
  }
}


module.exports = Template;

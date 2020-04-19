const React = require('react');
const Head = require('./head');
const Nav = require('./nav');

class Home extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body>

          <div className="container">
            <div className="row my-3">
              <div className="col-8 offset-2">
                <Nav />
                <p className="h4 text-center text-info">
                  Welcome to tunr!
                </p>
              </div>
            </div>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = Home;

const React = require('react');
const Head = require('./head');
const Nav = require('./nav');
const Foot = require('./foot');

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Tunr";
    this.count = props.sitecount || "PLACEHOLDER COUNT",
    this.auth = props.auth,
    this.username = props.username || "Guest"
  }

  render() {
    return (
      <html className="h-100">
        <Head title={this.title}/>

        <body className="d-flex flex-column h-100">

          <main role="main" className="flex-shrink-0">
            <div className="container text-center">
              <div className="row my-3">
                <div className="col-8 offset-2">

                  <Nav auth={this.auth}/>

                  {this.renderContent()}

                </div>
              </div>
            </div>
          </main>

          <Foot data={{count: this.count, user: this.username}} />
        </body>
      </html>
    );
  }
}

module.exports = Template;

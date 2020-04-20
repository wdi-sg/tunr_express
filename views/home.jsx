var React = require("react");
var Main = require("./main");

class Home extends React.Component {
  render() {
    const Home = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>Welcome to Tunes DB!</h1>
          </div>
        </div>
      </div>
    );

    return <Main children={Home} viewCount={this.props.viewCount} />;
  }
}

module.exports = Home;

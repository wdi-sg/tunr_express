var React = require("react");
var Main = require("./main");

class Home extends React.Component {
  render() {
    const Home = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>Welcome to Tunes DB!</h1>
            <br></br>
            <h5 id="congrats"></h5>
            <br></br>
            <img id="badge-img"></img>
            <script src="/script-badge.js"></script>
          </div>
        </div>
      </div>
    );

    return <Main children={Home}/>;
  }
}

module.exports = Home;

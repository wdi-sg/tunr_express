var React = require("react");
var Defaultcss = require('./defaultcss');

class Home extends React.Component {
  render() {
    return (
        <Defaultcss>
            <h1>WELCOME!</h1>
            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                      <strong>Please Read!</strong><br /> Use navbar to navigate to artists, songs and playlists.
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
        </Defaultcss>
    );
  }
}

module.exports = Home;
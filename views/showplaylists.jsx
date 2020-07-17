var React = require("react");
var Layout = require('./defaultlayout.jsx');

class Showplaylists extends React.Component {
  render() {
      const playlists = this.props.result.map(element => {
          return (
                <div className="card col-4 m-2">
                    <a href={"http://localhost:3000/playlists/"+element.id}>
                      <div className="card-body">
                      <h5 className="card-title">{element.id}: {element.name}</h5>
                      </div>
                    </a>
                </div>
          )  
      });
    return (
        <Layout>
          <h2 className="text-center m-3">All playlists</h2>
          <div className="text-center col-12 d-flex flex-wrap justify-content-center">
              {playlists}
          </div>
        </Layout>
    );
  }
}

module.exports = Showplaylists;

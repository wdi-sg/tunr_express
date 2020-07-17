var React = require("react");
var Layout = require('./defaultlayout.jsx');

class ShowOnePlaylist extends React.Component {
  render() {
      let playlist;
      const songs = this.props.result.map(element => {
          if (element.id === this.props.inputID) {
            playlist = element.name;

              return (
                  <div className="card col-4 m-2">
                    <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                  </div>
                </div>
          )  
        } else {
            return <span></span>
        }
      });
    return (
        <Layout>
          <h2 className="text-center m-3">Playlist: {playlist}</h2>
          <div className="text-center col-12 d-flex flex-wrap justify-content-center">
              {songs}
          </div>
        </Layout>
    );
  }
}

module.exports = ShowOnePlaylist;

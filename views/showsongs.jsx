var React = require("react");
var Layout = require('./defaultlayout.jsx');

class ShowSongs extends React.Component {
  render() {
      const songs = this.props.result.map(element => {
          return (
                <div class="card col-3 m-2">
                    <div class="card-body">
                    <h5 class="card-title">{element.title}</h5>
                    <p class="card-text">From <span className="font-italic">{element.album}</span></p>
                    <a href={element.preview_link} class="btn btn-outline-info btn-block">Listen</a>
                  </div>
                </div>
          )  
      });
    return (
        <Layout>
          <h1 className="text-center">Songs by Artist</h1>
          <div class="text-center col-12 d-flex flex-wrap justify-content-center">
              {songs}
          </div>
        </Layout>
    );
  }
}

module.exports = ShowSongs;

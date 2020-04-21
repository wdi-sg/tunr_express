var React = require("react");
const Layout = require("./layout");
class New extends React.Component {
  render() {
    return (
      <html>
        <Layout />
        <body>
          <div className="container mt-4 text-center">
         
              <h1 className="display-3 border-bottom">
                {this.props.result.title}
              </h1>

              <h2 className="mt-3">Artist: {this.props.result.name}</h2>
              <h2 className="mt-3">Album: {this.props.result.album}</h2>
              <br/>
              <audio controls>
              <source src={this.props.result.preview_link} />
              </audio>
             
              <form action="/songtofav" method="POST">
              <input type="hidden" name="songId" value={this.props.result.id}/>
              <button type="submit" className="btn btn-success btn-lg btn btn-block mt-3" >
                Add to Favorites
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;

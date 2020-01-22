var React = require("react");
var DefaultLayout = require('./layouts/default');
class addSongs extends React.Component {
  render() {
       let formUrl = "/artist/"+this.props.id;
       console.log(this.props.name);
    return (
        <DefaultLayout>
                  <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
<form className="mt-5" method="POST" action={formUrl}>
  <div className="form-group">
  <h1>Add Songs</h1>
    <label htmlFor="name">Title</label>
    <input type="text" className="form-control" name="name" value={this.props.title}/>
    </div>
  <div className="form-group">
    <label htmlFor="photo_url">Album</label>
    <input type="text" className="form-control" name="photo_url" value={this.props.album}/>
    </div>
  <div className="form-group">
    <label htmlFor="nationality">Preview link</label>
    <input type="text" className="form-control" name="nationality" value={this.props.preview_link}/>
    </div>
     <div className="form-group">
    <label htmlFor="nationality">Artwork</label>
        <input type="text" className="form-control" name="nationality" value={this.props.artwork}/>
    </div>
     <div className="d-flex flex-row-reverse">
    <button type="submit" className="btn btn-primary btn-customized">Add</button>
    </div>
    </form>
    </div>
    </div>
    </div>
        </DefaultLayout>
    );
  }
}

module.exports = addSongs;
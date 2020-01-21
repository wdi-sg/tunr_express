var React = require("react");
var DefaultLayout = require('./layouts/default');
class editArtist extends React.Component {
  render() {
       let formUrl = "/artists/"+this.props.id+"?_method=put";
       console.log(this.props.name);
    return (
        <DefaultLayout>
                  <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
<form className="mt-5" method="POST" action={formUrl}>
  <div className="form-group">
  <h1>New Artists</h1>
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" name="name" value={this.props.name}/>
    </div>
  <div className="form-group">
    <label htmlFor="photo_url">Photo URL</label>
    <input type="text" className="form-control" name="photo_url" value={this.props.photo_url}/>
    </div>
  <div className="form-group">
    <label htmlFor="nationality">Nationality</label>
    <input type="text" className="form-control" name="nationality" value={this.props.nationality}/>
    </div>
     <div className="d-flex flex-row-reverse">
    <button type="submit" className="btn btn-primary btn-customized">Edit</button>
    </div>
    </form>
    </div>
    </div>
    </div>
        </DefaultLayout>
    );
  }
}

module.exports = editArtist;
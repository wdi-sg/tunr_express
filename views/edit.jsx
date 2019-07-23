var React = require("react");

class Edit extends React.Component {
  render() {
    let link = "/artists/"+this.props.id+"?_method=PUT";
    return (
      <html>
        <head/>
        <body>
        <h2>Edit information of {this.props.name}!</h2>
            <form method="POST" action={link}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" value={this.props.name} className="form-control" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Img URL</label>
                    <div className="col-sm-10">
                        <input name="photo_url" value={this.props.photo_url} className="form-control" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Nationality</label>
                    <div className="col-sm-10">
                        <input name="nationality" value={this.props.nationality} className="form-control" required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark d-block mx-auto">Submit</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
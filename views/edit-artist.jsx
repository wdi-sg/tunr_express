var React = require("react");
var DefaultLayout = require('./layouts/default');

class AddForm extends React.Component {
    render() {
        let artist = this.props.artists;
        let formLink = "/artists/"+artist.id+"?_method=PUT";
        return (
            <DefaultLayout>
                <div className="row">
                    <div className="col-8 offset-2">
                        <form method="POST" action={formLink}>
                            <h2 className="form-title">Edit Artist</h2>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Artist Name</label>
                                <div className="col-sm-10">
                                    <input name="name" className="form-control" value={artist.name} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Photo URL</label>
                                <div className="col-sm-10">
                                    <textarea name="photo_url" className="form-control" value={artist.photo_url} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Nationality</label>
                                <div className="col-sm-10">
                                    <textarea name="nationality" className="form-control" value={artist.nationality} required/>
                                </div>
                            </div>
                            <div className="buttons text-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <a href="/artists"><button type="button" className="btn btn-dark">Return</button></a>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = AddForm;
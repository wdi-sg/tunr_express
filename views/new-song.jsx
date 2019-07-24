var React = require("react");
var DefaultLayout = require('./layouts/default');

class AddForm extends React.Component {
    render() {
        let formLink = "../../"+this.props.id;
        return (
            <DefaultLayout>
                <div className="row">
                    <div className="col-8 offset-2">
                        <form method="POST" action={formLink}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Song title</label>
                                <div className="col-sm-10">
                                    <input name="title" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Album</label>
                                <div className="col-sm-10">
                                    <textarea name="album" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Preview Link</label>
                                <div className="col-sm-10">
                                    <textarea name="preview_link" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Artwork</label>
                                <div className="col-sm-10">
                                    <textarea name="artwork" className="form-control" required/>
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
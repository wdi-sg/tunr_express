const React = require('react');
const Layout = require('./layout');

class Edit extends React.Component {
    render() {
        let {id, name, photo_url, nationality} = this.props;
        return (
            <Layout>

                <form method="POST" action={"/artists/"+id+"?_method=put"}>
                    <div className="form-group">
                        <label>Artist Name</label>
                        <input className="form-control form-control-lg" type="text" value={name} name="name" required/>
                    </div>
                    <div className="form-group">
                        <label>URL</label>
                        <input className="form-control" type="url" value={photo_url} name="photo_url"/>
                    </div>
                    <div className="form-group">
                        <label>Nationality</label>
                        <input className="form-control" type="text" value={nationality} name="nationality" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Edit;
const React = require("react");
const Layout = require('./layout');

class New extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action="/artists">
                    <div className="form-group">
                        <label>Artist Name</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. Maroon HTML 5" name="name" required/>
                    </div>
                    <div className="form-group">
                        <label>URL</label>
                        <input className="form-control" type="url" placeholder="e.g. http://www.image.com/banana.jpg" name="photo_url"/>
                    </div>
                    <div className="form-group">
                        <label>Nationality</label>
                        <input className="form-control" type="text" placeholder="e.g. Javascriptian" name="nationality" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = New;
var React = require("react");

var Layout = require("./layout");

class New extends React.Component {
    render() {
        return (
    <Layout>
            <div className="container">
            <h1>Add Artists</h1>

                <form method="POST" action="/artists">

                <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name"/>
                </div>

                <div className="form-group">
                <label>Photo</label>
                <textarea className="form-control" name="photo"></textarea>
                </div>

                <div className="form-group">
                <label>Nationality</label>
                <textarea className="form-control" name="nationality"></textarea>
                </div>

                <button type="submit" className="btn btn-danger btn-customized">Create</button>

                <a href="/artists/" className="btn btn-primary ml-4">Back</a>

                </form>
            </div>
    </Layout>
);
    }
}

module.exports = New;
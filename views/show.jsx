const React = require('react');
const Layout = require('./layout');

class Show extends React.Component {
    render() {
// grab and destructure object
        let {id, name, photo_url, nationality} = this.props;
        return (
            <Layout>

                <div className="row">
                    <div className="col-8">
                        <h1 className="display-4">{name}</h1>
                        <hr className="my-4"/>
                    </div>
                    <div className="col-4"><img src={photo_url} className="img-fluid"/></div>
                    <div className="col-12">
                        <hr className="my-4"/>
                        <p className="lead">Nationality: {nationality}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <form method="GET" action={"/artists/"+id+"/edit"}>
                            <input type="submit" className="btn btn-warning btn-block" value="Edit"/>
                        </form>
                    </div>
                    <div className="col">
                        <form method="POST" action={"/artists/"+id+"?_method=delete"}>
                            <input type="submit" className="btn btn-danger btn-block" value="Delete"/>
                        </form>
                    </div>
                </div>
            </Layout>
        );
    };
};

module.exports = Show;
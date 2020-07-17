const React = require('react');
const Layout = require('./layout');

class Show extends React.Component {
    render() {
// grab and destructure object
        let {id, title, album, preview_link, artwork, artist_id} = this.props;
        return (
            <Layout>

                <div className="row">
                    <div className="col-8">
                        <h1 className="display-4">{title}</h1>
                        <hr className="my-4"/>
                        <audio controls src={preview_link}>Your browser does not support the<code>audio</code> element.</audio>
                    </div>
                    <div className="col-4"><img src={artwork} className="img-fluid"/></div>
                    <div className="col-12">
                        <hr className="my-4"/>
                        <p className="lead">Album: {album}</p>
                        <form method="POST" action={"/songs/"+id} className="ml-auto">
                            <input type="submit" className="btn btn-warning" value="Add to Favorites"/>
                        </form>
                    </div>
                </div>

            </Layout>
        );
    };
};

module.exports = Show;
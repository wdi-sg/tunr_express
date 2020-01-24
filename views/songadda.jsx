var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")

class SongAddA extends React.Component {
    render() {
        let actionStr = "/songs"
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>Enter Song Details</h3>
                        <div className="col-6">
                            <form action={actionStr} method="POST">
                                <div className="form-group">
                                    <label>Title :</label>
                                    <input type="text" className="form-control" placeholder="Title of Song" name="title"/>
                                </div>
                                <div className="form-group">
                                    <label>Album :</label>
                                    <input type="text" className="form-control" placeholder="Name of Album" name="album"/>
                                </div>
                                <div className="form-group">
                                    <label>Preview Link :</label>
                                    <input type="text" className="form-control" placeholder="Preview" name="preview_link"/>
                                </div>
                                <div className="form-group">
                                    <label>artwork :</label>
                                    <input type="text" className="form-control" placeholder="Artwork" name="artwork"/>
                                </div>
                                <input type="hidden" name="artist_id" value={this.props.artistId}/>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = SongAddA;
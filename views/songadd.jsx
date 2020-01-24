var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")

class SongAdd extends React.Component {
    render() {
        let selectEle = this.props.artists.map ( artist => {
            return (<option value={artist.id}>{artist.name}</option>);
        })
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h3>Enter Song Details</h3>
                        <div className="col-6">
                            <form action="/songs" method="POST">
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
                                    <label>Artwork :</label>
                                    <input type="text" className="form-control" placeholder="Artwork" name="artwork"/>
                                </div>
                                <select name="artistId">
                                    {selectEle}
                                </select>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = SongAdd;
var React = require("react");
var DefaultLayout = require('./layouts/default');


class songNewByArtist extends React.Component {
  render() {

    return (

    <DefaultLayout>
        <body>
            <h3 className="h6">Create a New Song</h3>
            <form method='POST' action = {'/artists/' + this.props.idArtist + '/songs'}>
                <div class="form-group">
                    <label>Title</label>
                    <input class="form-control" placeholder="Enter title" name="title"/>
                </div>
                <div class="form-group">
                    <label>Album</label>
                    <input class="form-control" placeholder="Enter album" name="album"/>
                </div>
                <div class="form-group">
                    <label>Preview URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter preview URL" name="preview_link"/>
                </div>
                <div class="form-group">
                    <label>Artwork URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter artwork URL" name="artwork"/>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Artist ID</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.id} name="artist_id"/>
                    </div>
                </div>
                    <input type="submit" value="Submit" className="btn btn-primary text"/>
            </form>
        </body>
    </DefaultLayout>
    )

  }
}

module.exports = songNewByArtist;
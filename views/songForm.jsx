var React = require("react");

class songForm extends React.Component {
  render() {
    let artistOptions = this.props.artists.map(artist => {
        return ( <option>{artist.name}</option> )
    });

    let action;
    if (this.props.songs) {
       action = '/songs/' + this.props.songs.id + "/put?_method=PUT"
    } else if (this.props.id) {
        action = '/artists/' + this.props.id + '/songs/new';
    } else {
        action = '/songs/new'
    };


    return (
                <form method='POST' action={action}>
                <div class="form-group">
                    <label>Title</label>
                    <input class="form-control" placeholder="Enter title" name="title" defaultValue={this.props.songs.title}/>
                </div>
                <div class="form-group">
                    <label>Album</label>
                    <input class="form-control" placeholder="Enter album" name="album" defaultValue={this.props.songs.album}/>
                </div>
                <div class="form-group">
                    <label>Preview URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter preview URL" name="preview_link" defaultValue={this.props.songs.preview_link}/>
                </div>
                <div class="form-group">
                    <label>Artwork URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter artwork URL" name="artwork" defaultValue={this.props.songs.artwork}/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect2">Select Artist(s)</label>
                    <select multiple class="form-control">
                        {artistOptions}
                    </select>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary text"/>
            </form>
    )

  }
}

module.exports = songForm;
var React = require("react");


class artistForm extends React.Component {
  render() {
    let action;
    this.props.artist ? action = '/artists/' + this.props.artist.id + "/put?_method=PUT" : action = '/artists/new';

    return (
                <form method='POST' action={action}>
                <div class="form-group">
                    <label>Name</label>
                    <input class="form-control" placeholder="Enter name" name="name" defaultValue={this.props.artist.name}/>
                </div>
                <div class="form-group">
                    <label>Nationality</label>
                    <input class="form-control" placeholder="Enter nationality" name="nationality" defaultValue={this.props.artist.nationality}/>
                </div>
                <div class="form-group">
                    <label>Photo URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter url" name="photo_url" defaultValue={this.props.artist.photo_url}/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary text"/>
            </form>
    )

  }
}

module.exports = artistForm;
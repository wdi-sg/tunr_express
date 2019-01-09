var React = require("react");
var DefaultLayout = require('./layouts/default');


class artistNew extends React.Component {
  render() {

    return (

    <DefaultLayout>
        <body>
            <h3 className="h6">Create a New Artist</h3>
            <form method='POST' action='/artists'>
                <div class="form-group">
                    <label>Name</label>
                    <input class="form-control" placeholder="Enter name" name="name"/>
                </div>
                <div class="form-group">
                    <label>Nationality</label>
                    <input class="form-control" placeholder="Enter nationality" name="nationality"/>
                </div>
                <div class="form-group">
                    <label>Photo URL</label>
                    <textarea class="form-control" rows="5" placeholder="Enter url" name="photo_url"/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary text"/>
            </form>
        </body>
    </DefaultLayout>
    )

  }
}

module.exports = artistNew;
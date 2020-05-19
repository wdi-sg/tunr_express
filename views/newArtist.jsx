var React = require("react");
var DefaultLayout = require('./layouts/default');

class Form extends React.Component {
    render() {
        return (
            <form action="/artists" method="POST">
              <div className="form-group">
                <label for="artistName">Artist Name</label>
                <input type="text" className="form-control" id="artistName" aria-describedby="artistName" placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label for="artistNationality">Artist Nationality</label>
                <input type="text" className="form-control" id="artistNationality" placeholder="Nationality" />
              </div>
              <div className="form-group">
                <label for="imageURL">Artist Image</label>
                <input type="text" className="form-control" id="imageURL" placeholder="Place artist Image here" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            )
    }
}


class NewArtist extends React.Component {
    render() {
        return (
            <DefaultLayout>
            <h1>Add a New Artist!</h1>
            <div className="row">
                <Form></Form>
            </div>
            </DefaultLayout>
            )
    }
}


module.exports = NewArtist;
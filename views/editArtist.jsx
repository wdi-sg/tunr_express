var React = require('react');
var Navbar = require('./navbar');

class editArtist extends React.Component {

  render(props){

      return (
        <Navbar>
          <h1>Edit this Artist</h1>
          <div className="form-group col-6 ">
            <form action={"http://localhost:3000/edit/editedArtist/"+ this.props[0].id} method="post">
              <input id="name" type="text" name="name" className="form-control mb-1" defaultValue={this.props[0].name} />
              <input id="photo_url" name="photo_url" type="text" className="form-control mb-1"defaultValue={this.props[0].photo_url}/>
              <input id="nationality" name="nationality" type="text" className="form-control mb-1" defaultValue={this.props[0].nationality}/>
              <input type="submit" />
            </form>
          </div>
        </Navbar>
      );
    }
  }

  module.exports = editArtist;
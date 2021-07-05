var React = require('react');
var Navbar = require('./navbar');

class createArtist extends React.Component {

  render(props){

      return (
        <Navbar>
          <h1>Add a new artist</h1>
          <div className="form-group col-6 ">
            <form action="http://localhost:3000/create/newArtist" method="post">
              <input id="name" type="text" name="name" className="form-control mb-1" placeholder="Please enter the name." />
              <input id="photo_url" name="photo_url" type="text" className="form-control mb-1" placeholder="What is the URL for the photo?" />
              <input id="nationality" name="nationality" type="text" className="form-control mb-1" placeholder="What is the artist's nationality?" />
              <input type="submit" />
            </form>
          </div>
        </Navbar>
      );
    }
  }

  module.exports = createArtist;
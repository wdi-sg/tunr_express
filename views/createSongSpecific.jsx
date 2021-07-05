var React = require('react');
var Navbar = require('./navbar');

class createSongSpecific extends React.Component {

  render(props){

      return (
        <Navbar>
          <h1>Add a new Song for {this.props[0].name}</h1>
          <div className="form-group col-6 ">
            <form action="http://localhost:3000/create/newSong" method="post">
              <input id="title" type="text" name="title" className="form-control mb-1" placeholder="Please enter the title." />
              <input id="album" name="album" type="text" className="form-control mb-1" placeholder="What is the album name?" />
              <input id="preview_link" name="preview_link" type="text" className="form-control mb-1" placeholder="What is the preview_link?" />
              <input id="artwork" name="artwork" type="text" className="form-control mb-1" placeholder="What is the artwork's link?" />
              <input id="artist_id" name="artist_id" type="text" className="form-control mb-1" value={this.props[0].id} hidden/>
              <input type="submit" />
            </form>
          </div>
        </Navbar>
      );
    }
  }

  module.exports = createSongSpecific;
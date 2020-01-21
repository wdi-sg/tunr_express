var React = require('react');

var Layout = require('./layout')

class Songs extends React.Component {
  render() {
    console.log(this.props);
    let songLists = this.props.songs.map((song)=>{

        let linkTitle = song.title;
        let linkSong = song.preview_link;
        return (
            <li>
            <a href={linkSong}> {linkTitle} </a>
            </li>
        )
    });
    return (
        <Layout>
          <div className="container">
          <h1>This is {this.props.name}</h1>
          <div className="row d-flex">
          <div className="col-md-4">
            <img src={this.props.img} className="img-fluid" alt="photo"/>
          </div>

          <div className="col-md-8">

            <div>
            <h5>Name: </h5>
            <p>{this.props.name}</p>
            </div>

            <div>
            <h5>Nationality: </h5>
            <p>{this.props.nationality}</p>
            </div>

            <div>
            <h5>Song List: </h5>
            <ul>
            {songLists}
            </ul>
            </div>

            </div>
          </div>
          </div>
      </Layout>
    );
  }
}

module.exports = Songs;
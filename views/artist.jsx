var React = require("react");
var DefaultLayout = require('./layout/default');


class Artist extends React.Component {
  render() {
    let item = this.props.artists;
    let editURL = "/artist/"+item.id+"/edit";
    let deleteURL = "/artist/" +item.id+"?_method=delete";
    return (
          <DefaultLayout>
          <div className="one_artist">
          <img className="artist_picture" src={item.photo_url} width="400px" height="400px"/>
          <p className="name"> Name: {item.name}</p>
          <p className="nationality"> Nationality: {item.nationality}</p>
          </div>

          <div className="editDelete">

          <form method="POST" action={deleteURL}>
          <input type="submit" value="Delete"/>
          </form>

          <form action={editURL}>
          <input type="submit" value="Edit"/>
          </form>

          <form action="/artist">
          <input type="submit" value="Home"/>
          </form>
          </div>

          </DefaultLayout>
    );
  }
}

module.exports = Artist;
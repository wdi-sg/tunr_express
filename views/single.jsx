var React = require("react");
const Layout = require("./layout");

class Single extends React.Component {
  render() {
      let editUrl = "/artists/"+this.props.artists.id+"/edit";
      let deleteUrl = "/artists/"+this.props.artists.id+"?_method=delete";
      let listofSongs = this.props.songs.map(item => {
      return <li>{item.title}</li>
    });
    return (
      <Layout>
          <div class="breadcrumb">
              <a href="/artists">Main Artists</a> - #{this.props.artists.id} {this.props.artists.name} 
          </div>
          <div class="artist">
            <div class="artist-image">
                <img src={this.props.artists.photo_url}></img>
            </div>
            <div class="artist-description">
                <h1>{this.props.artists.name}</h1>
                Nationality: {this.props.artists.nationality} <br /><br />
                <a href={editUrl}><div class="button-edit">Edit</div></a>
                <a href={deleteUrl}><div class="button-delete">Delete</div></a>
            </div>
          </div>

          <div class="artist-songs">
                <h1>Songs:</h1>
                {listofSongs}<br />
            </div>
      </Layout>
    );
  }
}

module.exports = Single;

var React = require("react");
var Layout = require("./component/layout-allpage.jsx");


class Home extends React.Component {
  render() {
    //code goes here
    var display = this.props.playlist.map((obj)=>{
      var link = '/playlist/'+obj.id+'/songs';
      return <a href={link}>{obj.playlist_name}</a>
    })
    //user will put content in here. content will differ from page to page
    return (
      <Layout cookies={this.props.cookies}>
        <div id="artist-holding-page">
          list of available playlists
          {display}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

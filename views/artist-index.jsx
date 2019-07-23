var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
var Artist = require("./component/component-artist.jsx");

class Home extends React.Component {
  render() {
    //code goes here
    var artists = this.props.artists.map((obj)=>{
      return <Artist id={obj.id} name={obj.name} photo_url={obj.photo_url}></Artist>
    });

    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {artists}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

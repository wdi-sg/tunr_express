var React = require("react");
var Layout = require("./component/layout-allpage.jsx");


class Home extends React.Component {
  render() {
    //code goes here
    var display = this.props.data.map((obj)=>{
      return <div>{obj.song_title}<br/><audio src={obj.preview_link} controls></audio></div>
    })
    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {this.props.playname} playlist
          {display}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

var React = require("react");
var Layout = require("./component/layout-allpage.jsx");

class Login extends React.Component {
  render() {
    //code goes here
    var displayData = this.props.data.map((obj)=>{
      return <div><p>{obj.title}</p><p>{obj.album}</p><audio src={obj.preview_link} controls></audio></div>
    })

    //user will put content in here. content will differ from page to page
    return (
      <Layout cookies={this.props.cookies}>
        <div id="artist-holding-page">
        <p>Here are your favorite songs</p>
          {displayData}
        </div>
      </Layout>
    );
  }
}

module.exports = Login;

var React = require("react");
var Layout = require("./component/layout-allpage.jsx");

class Home extends React.Component {
  render() {
    //code goes here
    var artistLink = "/artist/"+this.props.artist[0].id+"?_method=PUT"
    var editForm=
    <form action={artistLink} method="post">
    <label>Name</label><br/>
    <input type="text" name="name" value={this.props.artist[0].name}/><br/><br/>
    <label>Photo URL</label><br/>
    <input type="text" name="photo_url" value={this.props.artist[0].photo_url}/><br/><br/>
    <label>Nationality</label><br/>
    <input type="text" name="nationality" value={this.props.artist[0].nationality}/><br/><br/>
    <input type="submit" value="Submit changes"/>
    </form>


    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {this.props.artist[0].name}
          {editForm}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

var React = require("react");
var Layout = require("./component/layout-allpage.jsx");


class Home extends React.Component {
  render() {
    //code goes here
    var form=
    <form action="/artist/" method="POST">
    <label>Name</label><br/>
    <input type="text" name="name"/><br/><br/>
    <label>Photo URL</label><br/>
    <input type="text" name="photo_url"/><br/><br/>
    <label>Nationality</label><br/>
    <input type="text" name="nationality"/><br/><br/>
    <input type="submit" value="Create artist"/>
    </form>

    //user will put content in here. content will differ from page to page
    return (
      <Layout cookies={this.props.cookies}>
        <div id="artist-holding-page">
          {form}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

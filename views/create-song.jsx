var React = require("react");
var Layout = require("./layout");

class CreateSong extends React.Component {
  render() {
    return (
      <Layout>
          <h3>Form Goes Here!</h3>
          <form className="input-form" method="POST" action={"/artist/"+this.props.artistId+"/songs/new"}>
            <input type="text" name="title" placeholder="Input title"/>
            <input type="text" name="album" placeholder="Input album"/>
            <input type="text" name="artwork" placeholder="Input link to artwork"/>
            <input type="submit" value="Create Song"/>
          </form>
      </Layout>
    );
  }
}

module.exports = CreateSong;
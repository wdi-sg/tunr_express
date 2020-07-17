var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form method="POST" action={"/artists/"}>
        <h1>Add a new artist here!</h1>
        <input type="hidden" name="id" value={(this.props.artistsKey.length)+1}/>
        Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="name"/>
        <br/>
        <br/>
        Picture:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="photo_url" style={{height: '60px', width:'420px'}}/>
        <br/>
        <br/>
        Nationality:&nbsp;
        <input type="text" name="nationality"/>
        &nbsp;&nbsp;&nbsp;
        <input type="submit" value="Add now!"/>
        </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

var React = require("react");

class Edit extends React.Component {
  render() {
    let item = this.props.artistsKey;
    let actionUrl = "/artists/"+item.id+"?_method=PUT";
    return (
      <html>
        <head />
        <body>
        <form method="POST" action={actionUrl}>
        <h1>Edit your artists here!</h1>
        Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="name" defaultValue={this.props.artistsKey.name}/>
        <br/>
        <br/>
        Picture:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="photo_url" style={{height: '60px', width:'420px'}} defaultValue={this.props.artistsKey.photo_url}/>
        <br/>
        <br/>
        Nationality:&nbsp;
        <input type="text" name="nationality" defaultValue={this.props.artistsKey.nationality}/>
        &nbsp;&nbsp;&nbsp;
        <input type="submit" value="Edit now!"/>
        </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
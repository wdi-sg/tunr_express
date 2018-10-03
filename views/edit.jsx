var React = require("react");

class Edit extends React.Component {
  render() {
  let actionPath = "/" + this.props.artists[0].id + "?_method=PUT";
  return ( 
      <div>   
        <h1>Edit Artists</h1>
        <form action ={actionPath} method="POST">
        <p>name</p>
        <input type="text" name="name" value={this.props.artists[0].name}/>
        <p>nationality</p>
        <input type="text" name="nationality" value={this.props.artists[0].nationality}/>
        <p>photo url</p>
          <input type="text" name="photo_url" value={this.props.artists[0].photo_url}/>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>     
    );
  }
}

module.exports = Edit;


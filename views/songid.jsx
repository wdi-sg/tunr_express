var React = require("react");

class New extends React.Component {
  render() {
    let {title,album,preview_link,artwork,name,id}=this.props;
    console.log(title,album,preview_link,artwork,name,id)
    return (
      <html>
        <head />
        <body>
            <p>Artist: {name}</p>
            <p>Title: {title}</p>
            <p>Album: {album}<br/>
            <br/>Preview:<br/>
            <audio controls>
            <source src={preview_link} type ="audio/mpeg"/><br/>
            </audio><br/>
            <img src={artwork}/><br/></p>
          <form method ="POST" action={`/songs/${id}?_method=delete`}>
            <input type="submit" value="Delete"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

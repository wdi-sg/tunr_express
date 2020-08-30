var React = require("react");

class New extends React.Component {
  render() {
    let {title,album,preview_link,artwork,name,id}=this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{title}</h3>
          <form method ="POST" action={`../songs/${id}?_method=put`}>
            <label htmlFor ="title">Title</label><br/>
            <input type="text" name="title"/><br/><br/>
            <label htmlFor ="album">Album</label><br/>
            <input type="text" name="album"/><br/><br/>
            <label htmlFor ="preview_link">Preview Link</label><br/>
            <input type="text" name="preview_link"/><br/><br/>
            <label htmlFor ="artwork">Artwork Link</label><br/>
            <input type="text" name="artwork"/><br/><br/>
            <input type="submit" value="update"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

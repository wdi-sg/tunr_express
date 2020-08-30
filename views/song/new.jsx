var React = require("react");

class New extends React.Component {
  render() {
    let {name = ''} = this.props;
    console.log(this.props);
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <p>Display the form for a single new song</p>
          <form method="POST" action="/songs">
            Title: <input type="text" name="title"/>
            <br/>
            Album: <input type="text" name="album"/>
            <br/>
            Preview Link: <input type="text" name="preview_link"/>
            <br/>
            Artwork: <input type="text" name="artwork"/>
            <br/>
            Artist name: <input type="text" name="artist_name" defaultValue={name}/>
            <br/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
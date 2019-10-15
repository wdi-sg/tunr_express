var React = require("react");

class NewSong extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>{this.props.name}</h1>
          <div>
            <form action="/artist/1/songs" method ="POST">
                <div>
                    <label> Title </label>
                    <input type ="text" name="title"/>
                </div>
                <div>
                    <label> Album </label>
                    <input type ="text" name="album"/>
                </div>
                <div>
                    <label> Preview Link </label>
                    <input type ="text" name="preview_link"/>
                </div>
                <div>
                    <label> Artwork </label>
                    <input type ="text" name="artwork"/>
                </div>
                <input type="submit" value="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;